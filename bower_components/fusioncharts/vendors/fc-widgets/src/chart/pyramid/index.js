import FunnelPyramidBase from'../_internal/funnelpyramidbase';import PyramidDataset from'../../dataset/pyramid';class Pyramid extends FunnelPyramidBase{static getName(){return'Pyramid'}constructor(){super(),this.useSortedData=!1}getName(){return'Pyramid'}__setDefaultConfig(){super.__setDefaultConfig();let a=this.config;a.friendlyName='Funnel Chart',a.defaultDatasetType='pyramid'}configureAttributes(){super.configureAttributes(),this.config.PLOT_COLOR_INDEX_START=0}getDSdef(){return PyramidDataset}}export default Pyramid;