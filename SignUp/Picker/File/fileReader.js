import RNFetchBlob from 'rn-fetch-blob'
export default class FRP {
    constructor(p){
        this._p=p;
    }
    readAsString = () => {
        //alert(RNFS.DocumentDirectoryPath)
        return RNFetchBlob.fs.readFile(this._p, 'base64')
        
    }
}