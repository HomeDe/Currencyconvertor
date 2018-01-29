function isNumber(evt) {
	var iKeyCode = (evt.which) ? evt.which : evt.keyCode
	if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
		return false;

	return true;
}

//APi call starts here

document.addEventListener('DOMContentLoaded', function() {

var request = new XMLHttpRequest();
var data = [];
var url = 'https://api.fixer.io/latest';
var inputs = document.querySelectorAll('input[id^="input_"]')
var selects = document.querySelectorAll('select[id^="select_"]')


request.onreadystatechange = function() {
if(request.readyState === 4) {
	if(request.status === 200) { 
		data = JSON.parse(request.responseText);
		console.log(data.rates);
		onSuccess(data);
			
	} else {
		alert('An error occurred during your request: ' +  request.status + ' ' + request.statusText);
	} 
	}
}

request.open('Get', url);
request.send();

function onSuccess(data){
for (var i = 0; i < selects.length; i++) {
	for (var key in data.rates) {
			selects[i].options[selects[i].options.length] = new Option(key, data.rates[key]);
		}
}
}
//change input/select event hander start here
function addEventHandler(elem, eventType, handler) {
	if (elem.addEventListener)
		elem.addEventListener (eventType, handler, false);
	else if (elem.attachEvent)
		elem.attachEvent ('on' + eventType, handler); 
	}


for (var inpt = 0; inpt < inputs.length; inpt++) {
	addEventHandler(inputs[inpt], 'keyup', function() {

		var idName = this.getAttribute("id");
		var parentId = idName.split("_")[1];
		var chieldId = idName.split("_")[2];
		var fromInputid = document.getElementById('input_'+parentId+'_'+chieldId)
		console.log("from"+fromInputid);
		var toInputid = document.getElementById('input_'+parentId+'_'+(chieldId==1?2:1))
		console.log(toInputid);
		var fromInput = fromInputid.value;
		var fromSelect = document.getElementById('select_'+parentId+'_1').value;
		var toSelect = document.getElementById('select_'+parentId+'_2').value;
		toInputid.value = calculate(fromInput,fromSelect,toSelect);
		});
	}

for (var sel = 0; sel < selects.length; sel++) {

	addEventHandler(selects[sel], 'change', function() {
	var idName = this.getAttribute("id");	 
	var parentId = idName.split("_")[1];
	var chieldId = idName.split("_")[2];
	var fromInputid = document.getElementById('input_'+parentId+'_'+(chieldId==1?2:1))
	var toInputid = document.getElementById('input_'+parentId+'_'+chieldId)
	
	var fromInput = fromInputid.value;
	var fromSelect = document.getElementById('select_'+parentId+'_1').value;
	var toSelect = document.getElementById('select_'+parentId+'_2').value;
	toInputid.value = calculate(fromInput,fromSelect,toSelect);
	});
}

function calculate(fromAmount,fromType,toType){
	return fromAmount* fromType/toType;
}
});