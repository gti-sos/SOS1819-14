import*as timeIntervals from'../time-intervals';import*as timeIntervalsUTC from'../time-intervals/utc';import{DatetimeUnits,Weekdays}from'../datetime-enums';import TC from'../time-converter';const unitDefaultFormats={Year:'%Y',Month:'%b %Y',Day:'%b %d, %Y',Hour:'%b %d, %Y %H hrs',Minute:'%b %d, %Y %H:%M',Second:'%b %d, %Y %H:%M:%S',Millisecond:'%b %d, %Y %H:%M:%S:%L'},timeIntervalMapping={Millisecond:timeIntervals.timeMillisecond,Second:timeIntervals.timeSecond,Minute:timeIntervals.timeMinute,Hour:timeIntervals.timeHour,Day:timeIntervals.timeDay,Week:{0:timeIntervals.timeSunday,1:timeIntervals.timeMonday,2:timeIntervals.timeTuesday,3:timeIntervals.timeWednesday,4:timeIntervals.timeThursday,5:timeIntervals.timeFriday,6:timeIntervals.timeSaturday},Month:timeIntervals.timeMonth,Quarter:timeIntervals.timeQuarter,Year:timeIntervals.timeYear},UTCTimeIntervalMapping={Millisecond:timeIntervalsUTC.utcMillisecond,Second:timeIntervalsUTC.utcSecond,Minute:timeIntervalsUTC.utcMinute,Hour:timeIntervalsUTC.utcHour,Day:timeIntervalsUTC.utcDay,Week:{0:timeIntervalsUTC.utcSunday,1:timeIntervalsUTC.utcMonday,2:timeIntervalsUTC.utcTuesday,3:timeIntervalsUTC.utcWednesday,4:timeIntervalsUTC.utcThursday,5:timeIntervalsUTC.utcFriday,6:timeIntervalsUTC.utcSaturday},Month:timeIntervalsUTC.utcMonth,Quarter:timeIntervalsUTC.utcQuarter,Year:timeIntervalsUTC.utcYear};function getDefaultOutputFormat(a){return'Millisecond'===a||'Second'===a||'Minute'===a||'Hour'===a||'Day'===a||'Month'===a||'Year'===a?unitDefaultFormats[a]:'Week'===a?unitDefaultFormats.Day:'Quarter'===a?unitDefaultFormats.Month:void 0}function dateIntervalToString(){var a,b=this.config;switch(a=void 0!==b.enableUTC&&b.enableUTC?TC.utcFormatter(b.outputFormat):TC.formatter(b.outputFormat),b.duration.Unit){case'Millisecond':case'Second':case'Minute':case'Hour':case'Day':case'Month':case'Year':return a.format(new Date(this.start))+(1<b.duration.number?' - '+a.format(new Date(this.end-1)):'');case'Week':case'Quarter':return a.format(new Date(this.start))+' - '+a.format(new Date(this.end-1));}}function dateRangeCaclulator(a,b,c,d,e=!1){var f,g,h;return f=a,e&&(h=Object.assign({},b),h.number=1,f=getDateStart(f,h,c,d)),g=getDateOffset(f,b.Unit,b.number,c,d),{startDate:f,endDate:g}}function getDateStart(a,b,c,d,e){var f=c!==void 0&&c?UTCTimeIntervalMapping[b.Unit]:timeIntervalMapping[b.Unit];if(d&&!Weekdays[d.name])throw new Error(`Invalid weekStartFrom provided: ${d}`);if(1===b.number)return'Week'===b.Unit?(d=d||Weekdays.Sunday,+f[d.id].floor(new Date(a))):+f.floor(new Date(a));if(!e)return'Week'===b.Unit?(d=d||Weekdays.Sunday,+f[d.id].every(b.number).floor(new Date(a))):+f.every(b.number).floor(new Date(a));else{let g,h;return'Week'===b.Unit?(d=d||Weekdays.Sunday,g=f[d.id].count(e,a),h=g%b.number,h?getDateOffset(+f[d.id].floor(a),b.Unit,-h,c,d):+f[d.id].floor(a)):(g=f.count(e,a),h=g%b.number,h?getDateOffset(+f.floor(a),b.Unit,-h,c,d):+f.floor(a))}}function getDateOffset(a,b,c,d){switch(b){case'Month':case'Quarter':case'Year':let e=d!==void 0&&d?UTCTimeIntervalMapping[b]:timeIntervalMapping[b];return+e.offset(new Date(a),c);default:return a+DatetimeUnits[b].ms*c;}}export{getDefaultOutputFormat,dateIntervalToString,dateRangeCaclulator,getDateStart,getDateOffset};