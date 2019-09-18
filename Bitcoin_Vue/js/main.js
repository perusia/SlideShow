var app = new Vue({
    el:'#app',
    data:{
        bpi:null,
        hasError:false,
        loading:true
    },
    mounted:function(){
        axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(function(responce){
            //console.log(responce.data.bpi)
            //console.log(responce.data.bpi.USD.rate_float)
            this.bpi = responce.data.bpi
        }.bind(this))
        .catch(function(error){
            console.log(error)
            this.hasError=true
        }.bind(this))
        .finally(function(){
            this.loading=false
        }.bind(this))
    },
    filter:{
        currencyDecimal(value){
            return value.toFixed(2)
        }
    }
})