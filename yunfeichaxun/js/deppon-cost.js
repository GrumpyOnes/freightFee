
if(!localStorage['saleoff']){
	localStorage['saleoff']=8;
}
allowance=localStorage['saleoff']*0.1;
var cityList=[];

function init(){
	$('#inputOff').val(localStorage['saleoff']);
	$('#saleOff').html(localStorage['saleoff']);
	$('#settingContainerAlert').html('');
	$('#searchParamAlert').html('');
	$('#inputCity').val('');
	$('#inputWeight').val('');
	$('#noDataRemind').show();
	$('#liResultWrap').html('');
	$('#inputCity').focus();
};
function getFreight(weight,price){
	return parseInt(weight)*price*allowance>60?Math.floor(parseInt(weight)*price*allowance):60;
};
function bindValue(){
	if(cityList.length>0){
		$('#noDataRemind').hide();
		$('#liResultWrap').html('');
		cityList.forEach(function(ele,index){
			var _weight='--',_freight='--',_sentcost='--',_amount='--';
			if($('#inputWeight').val()){
				_weight=$('#inputWeight').val();
				_freight=getFreight(_weight,ele.price);
				_sentcost=sendCost[ele.grade];
				_amount=_freight+_sentcost;
			}
			$('#liResultWrap').append(
				'<li>'+
					'<span class="city">'+ele.province+' '+ele.fullname+'</span>'+
					'<span class="weight"><font>'+_weight+'</font>KG</span>'+
					'<span class="freight"><font>'+_freight+'</font>元</span>'+
					'<span class="sentcost"><font>'+_sentcost+'</font>元</span>'+
					'<span class="amount"><font>'+_amount+'</font>元</span>'+
				'</li>'

				);
		});
		

	}else{
		init();
	}
};
init();
$('#inputOff').on('change',function(event){
	var _off = $(this).val();
	if(_off<0 || _off>10){
		$('#settingContainerAlert').html('请输入0-10之间的整数或小数');
	}else{
		localStorage['saleoff']=_off;
		init();
	}
});
$('#inputCity').on('focus',function(){
	$(this).val('');
});
$('#inputWeight').on('focus',function(){
	$(this).val('');
});
$('#inputCity').on('change',function(event){
	var _city=$(this).val().toLowerCase(); 
	cityList=[];
	for(var i=0;i<country.length;i++){
		var province=country[i];
		for(var j=0;j<province.cities.length;j++){
			if(province.cities[j].id.indexOf(_city)===0){
				province.cities[j].province = province.fullname;
				cityList.push(province.cities[j]);
			}
		}
	}
	bindValue();
});
$('#inputWeight').on('change',function(event){
	if($(this).val()<0 || $(this).val()>500){
		$('#searchParamAlert').html('请输入0-500直接的整数，单位为公斤。');
		return;
	}
	$('#searchParamAlert').html('');
	bindValue();
});
$('#settingToggle span').on('click',function(event){
	if(!$('#settingContainer').hasClass('show')){
		$('#settingContainer').show();
		$(this).html('Hide');
		$('#settingContainer').addClass('show');
	}else{
		$('#settingContainer').hide();
		$(this).html('Setting');
		$('#settingContainer').removeClass('show');
	}
		
	//console.log(event);
});