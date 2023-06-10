//1970/1/1 9:0:0(日本時間)が起点
//Dateオブジェクトの起点(ミリ秒)
const zeroPoint = 2678400000
const wordList={
    50:'50位 OR TOP50 OR 五十位',
    100:'100位 OR TOP100 OR 百位',
    1000:'1000位 OR TOP1000 OR 千位',
    2000:'2000位 OR TOP2000 OR 2千位 OR 二千位',
    5000:'5000位 OR TOP5000 OR 5千位 OR 五千位',
    10000:'10000位 OR TOP10000 OR 1万位 OR 一万位',

};

window.onload=()=>{
    let today=new Date();
    document.getElementById('until_year').value=today.getFullYear();
    document.getElementById('until_month').value=today.getMonth()+1;
    document.getElementById('until_day').value=today.getDate();

}

function search(arg,newTab){
    let specifiedPeriod=document.getElementById('new').checked;
    let urlSpecifiedPeriod='';
    if (specifiedPeriod){
        let year=document.getElementById('until_year').value;
        let month=document.getElementById('until_month').value;
        let day=document.getElementById('until_day').value;
        let hour=document.getElementById('until_hour').value;
        let minutes=document.getElementById('until_minutes').value;
        let timeUntil = new Date(year,month,day,hour,minutes);
        if (isNaN(timeUntil.getTime())){
            alert('時刻不正');
            return;
        }
        let untilTimeSerial=(timeUntil.getTime()-zeroPoint)/1000;
        let sinceTimeSerial=untilTimeSerial-172800
        urlSpecifiedPeriod=`&since=${sinceTimeSerial}&until=${untilTimeSerial}`
    }
    let word = wordList[arg];

    //https://search.yahoo.co.jp/realtime/search?samplingRate=100&gm=m&ei=UTF-8&mtype=image&p=名古屋&since=1686322740&until=1686322770
    let url=`https://search.yahoo.co.jp/realtime/search?samplingRate=100&gm=m&ei=UTF-8&mtype=image&p=${word}`+urlSpecifiedPeriod;
    if(newTab===true){
        window.open(url);
    }else{
        location.href =url;
    }
}