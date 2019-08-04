export default class Direction {
    constructor(s,e,m){
        this._a="";
        this._u=`https://maps.googleapis.com/maps/api/directions/json?origin=${s}&destination=${e}&key=${"AIzaSyDhxF-PmnP1BgB-E4_K-m2XC6vkjtArvBw"}&mode=${m}`;
    }
    
    getDirection = ()=>{
        return fetch(this._u)
    }
}