import formatDecimal from'./format-decimal';const exponent=a=>(a=formatDecimal(Math.abs(a)),a?a[1]:NaN);export default exponent;