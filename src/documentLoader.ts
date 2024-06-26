/*!
 * Copyright (c) 2021 Interop Alliance and Dmitri Zagidulin. All rights reserved.
 */
import * as didKey from '@digitalcredentials/did-method-key';
import { Ed25519VerificationKey2020 }
  from '@digitalcredentials/ed25519-verification-key-2020';
import { X25519KeyAgreementKey2020 }
  from '@digitalcredentials/x25519-key-agreement-key-2020';
import { CachedResolver } from '@digitalcredentials/did-io';
import dccCtx from '@digitalcredentials/dcc-context';
import didContext from 'did-context';
import ed25519 from 'ed25519-signature-2020-context';
import x25519 from 'x25519-key-agreement-2020-context';
import cred from 'credentials-context';
import vcStatusListCtx from '@digitalbazaar/vc-status-list-context';
import { JsonLdDocumentLoader } from 'jsonld-document-loader';
import { CryptoLD } from '@digitalcredentials/crypto-ld';
import * as didWeb from '@interop/did-web-resolver';
import { parseResponseBody } from './parseResponse';
import obCtx from '@digitalcredentials/open-badges-context';
import { httpClient } from '@digitalbazaar/http-client';
// import vc2Context from '@digitalbazaar/credentials-v2-context';

const cryptoLd = new CryptoLD();
cryptoLd.use(Ed25519VerificationKey2020);
cryptoLd.use(X25519KeyAgreementKey2020);
const didWebDriver = didWeb.driver({ cryptoLd });

const {
  contexts: credentialsContext,
  constants: {
    CREDENTIALS_CONTEXT_V1_URL,
  },
} = cred;
const didKeyDriver = didKey.driver();
const resolver = new CachedResolver();
resolver.use(didKeyDriver);
resolver.use(didWebDriver);

export const httpClientHandler = {
  /**
   * @param {object} options - Options hashmap.
   * @param {string} options.url - Document URL.
   * @returns {Promise<{contextUrl: null, document, documentUrl}>} - Resolves
   *   with documentLoader document.
   */
  async get(params: Record<string, string>): Promise<unknown> {
    if(!params.url.startsWith('http')) {
      throw new Error('NotFoundError');
    }
    let result;
    try {
      const headers: Record<string, string> = {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      };
      result = await httpClient.get(params.url, { headers, parseBody: false });
    } catch(e: any) {
      throw new Error(`NotFoundError loading "${params.url}": ${e.message}`);
    }

    return parseResponseBody(result);
  }
};

declare interface IDocumentLoaderResult {
  contextUrl?: string;
  documentUrl?: string;
  document: any;
}

type documentLoader = (url: string) => Promise<IDocumentLoaderResult>;

declare class IJsonLdDocumentLoader {
  addStatic: (contextUrl: string, context: any) => void;
  setDidResolver: any;
  setProtocolHandler: any;
  documentLoader: any;
  build: () => documentLoader;
}

interface SecurityLoaderParams {
  fetchRemoteContexts?: boolean;
  useOBv3BetaContext?: boolean;
}

export function securityLoader({ fetchRemoteContexts = false, useOBv3BetaContext = false }: SecurityLoaderParams = {}): IJsonLdDocumentLoader {
  const loader: IJsonLdDocumentLoader = new JsonLdDocumentLoader();

  loader.addStatic(
    ed25519.constants.CONTEXT_URL,
    ed25519.contexts.get(ed25519.constants.CONTEXT_URL),
  );

  loader.addStatic(
    x25519.constants.CONTEXT_URL,
    x25519.contexts.get(x25519.constants.CONTEXT_URL),
  );

  loader.addStatic(
    didContext.constants.DID_CONTEXT_URL,
    didContext.contexts.get(didContext.constants.DID_CONTEXT_URL),
  );

  // Verifiable Credentials Data Model 1.0
  loader.addStatic(
    CREDENTIALS_CONTEXT_V1_URL,
    credentialsContext.get(CREDENTIALS_CONTEXT_V1_URL),
  );
  // Verifiable Credentials Data Model 2.0 - BETA / non-final
  // loader.addStatic(vc2Context.CONTEXT_URL, vc2Context.CONTEXT);

  loader.addStatic(dccCtx.CONTEXT_URL_V1, dccCtx.CONTEXT_V1);

  loader.addStatic(vcStatusListCtx.CONTEXT_URL_V1, vcStatusListCtx.CONTEXT_V1);

  // Open Badges v3 Contexts, includes OBv3 Beta, 3.0, 3.0.1, 3.0.2, etc.
  for (const [url, contextBody] of obCtx.contexts) {
    loader.addStatic(url, contextBody)
  }

  if (useOBv3BetaContext) {
    // Workaround to validate legacy OBv3 BETA context VCs
    loader.addStatic(obCtx.CONTEXT_URL_V3_0_0,
      obCtx.contexts.get(obCtx.CONTEXT_URL_V3_BETA))
  }

  loader.setDidResolver(resolver);

  // Enable loading of arbitrary contexts from web
  if (fetchRemoteContexts) {
    loader.setProtocolHandler({protocol: 'http', handler: httpClientHandler});
    loader.setProtocolHandler({protocol: 'https', handler: httpClientHandler});
  }

  return loader;
}
