import MSCartesian from'../_internal/mscartesian';import MarimekkoDataset from'../../dataset/marimekko';import Marimekkogroup from'../../dataset/groups/marimekko-stack';import msDatasetFactory from'../../factories/multiseries-dataset';import{pluckNumber}from'../../../../fc-core/src/lib';class Marimekko extends MSCartesian{static getName(){return'Marimekko'}_checkInvalidSpecificData(){let a=this.getFromEnv('dataSource'),b=a.dataset,c=a.categories;if(!b||!c||0===c.length||!c[0].category||!(c[0].category instanceof Array))return!0}constructor(){super(),this.isValueAbs=!0,this.distributedColumns=!0,this.stack100percent=!0,this.isStacked=!0,this.showsum=1,this.registerFactory('dataset',function(a){msDatasetFactory(a);let b=a.getChildren(),c=b.canvas[0],d=c.getChildren('vCanvas')[0],e=a.config.defaultDatasetType||'',f=d.getChildren('datasetGroup_'+e)[0];f.addToEnv('categories',a.getFromEnv('dataSource').categories)},['vCanvas'])}getName(){return'Marimekko'}parseChartAttr(a){super.parseChartAttr(a),this.config.showXAxisPercentValues=pluckNumber(a.chart&&a.chart.showxaxispercentvalues,1)}__setDefaultConfig(){super.__setDefaultConfig();let a=this.config;a.friendlyName='Marimekko Chart',a.defaultDatasetType='marimekko',a.isstacked=!0,a.showpercentvalues=0,a.usepercentdistribution=1,a.showsum=1,a.enablemousetracking=!0}getDSdef(){return MarimekkoDataset}getDSGroupdef(){return Marimekkogroup}}export default Marimekko;