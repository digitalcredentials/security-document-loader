import { expect } from 'chai'
import { httpClientHandler, securityLoader } from '../src';

describe('documentLoader', () => {
  it('should load a document', async () => {
    expect(httpClientHandler.get).to.exist

    const contextObject = {}
    const loader = securityLoader()
    loader.addStatic('https://example.com/my-context/v1', contextObject)

    const documentLoader = loader.build()

    const result = await documentLoader('https://example.com/my-context/v1')
    expect(result.document).to.equal(contextObject)
  })

  it('supports beta OBv3 context', async () => {
    const load = securityLoader().build()
    const { document } = await load('https://purl.imsglobal.org/spec/ob/v3p0/context.json')
    expect(document['@context'].OpenBadgeCredential['@id'])
      .to.equal('https://purl.imsglobal.org/spec/vc/ob/vocab.html#OpenBadgeCredential')

    const legacyLoad = securityLoader({useOBv3BetaContext: true}).build()
    const { document: legacyDocument } = await legacyLoad('https://purl.imsglobal.org/spec/ob/v3p0/context.json')
    expect(legacyDocument['@context'].OpenBadgeCredential['@id'])
      .to.equal('https://imsglobal.github.io/openbadges-specification/ob_v3p0.html#OpenBadgeCredential')
  })
})
