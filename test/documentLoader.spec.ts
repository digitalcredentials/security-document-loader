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
})
