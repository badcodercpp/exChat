var RNFS = require('react-native-fs');
import RNFetchBlob from 'rn-fetch-blob'
export default class FRP {
    constructor(p){
        this._p=p.replace('content:','');
    }
    readAsString = () => {
        //alert(this._p)
        let x= RNFS.DocumentDirectoryPath;
        alert(x="hello")
    }
}