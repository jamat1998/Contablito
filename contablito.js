const d=document;
const $description = d.getElementById('description');
const $compra = d.getElementById('compra');
const $venta = d.getElementById('venta');
const $basico = d.getElementById('basico');
const $minimo = d.getElementById('minimo');
const $exento = d.getElementById('exento');
const $table = d.getElementById('table');
const $form = d.getElementById('form');
const $submit = d.getElementById('submit');
const $totalsell = d.getElementById('totalsell');
const $inputtotal = d.getElementById('inputtotal');
const $totalbuy = d.getElementById('totalbuy');
const $transaciones = d.getElementsByTagName('tbody');
const $dayTotalSell = d.getElementsByClassName('dayTotalSell');
const $dayTotalBuy = d.getElementsByClassName('dayTotalBuy')

d.addEventListener('submit',(e)=>{
    e.preventDefault();
    let monto = parseInt($inputtotal.value);  
    let ivaBasico = parseInt($basico.value * monto) / 100;
    let ivaMinimo = parseInt($minimo.value * monto) / 100;
    let ivaExento = parseInt($exento.value * monto) / 100;
    
    function insertVenta(tipoDeIva){
        $transaciones[0].innerHTML+= `
        <tr>
        <td>${$description.value}</td>
        <td>${$venta.value}</td>
        <td class='dayTotalSell'>${$inputtotal.value}</td>
        <td>${tipoDeIva}</td>
        <td>${tipoDeIva + monto}</td>
        </tr>
        `
    }
    
function totalVentas() {
    let r=[]
    for (let i = 0; i < $dayTotalSell.length; i++) {
    let s = $dayTotalSell.item(i).innerHTML;
    r.push(s);
}
    let result = r.map(i=>Number(i))
    result = [...result].reduce((a, b) => a + b, 0)
    $totalsell.innerHTML = `Total Ventas:$${result}` 
}

if($venta.checked && $basico.checked && !$inputtotal.value == ''){ 
    insertVenta(ivaBasico)
   totalVentas()
}
if($venta.checked && $minimo.checked && !$inputtotal.value == ''){
    insertVenta(ivaMinimo)
    totalVentas()
}
if($venta.checked && $exento.checked && !$inputtotal.value == ''){
    insertVenta(ivaExento)
    totalVentas()
}
function insertCompra(tipoDeIva){
    $transaciones[0].innerHTML+= `
    <tr>
    <td>${$description.value}</td>
    <td>${$compra.value}</td>
    <td class='dayTotalBuy'>${$inputtotal.value}</td>
    <td>${tipoDeIva}</td>
    <td>${tipoDeIva + monto}</td>
    </tr>
    `
}

function totalCompras() {
     let r=[]
    for (let i = 0; i < $dayTotalBuy.length; i++) {
    let s = $dayTotalBuy.item(i).innerHTML;
    r.push(s);
    }
    let result = r.map(i=>Number(i))
    result = [...result].reduce((a, b) => a + b, 0);
    $totalbuy.innerHTML = `Total Compras:$${result}`
}

if($compra.checked && $basico.checked && !$inputtotal.value == ''){
    insertCompra(ivaBasico)
    totalCompras()
}
if($compra.checked && $minimo.checked && !$inputtotal.value == ''){
    insertCompra(ivaMinimo)
    totalCompras()
}
if($compra.checked && $exento.checked && !$inputtotal.value == ''){
    insertCompra(ivaExento)
    totalCompras()
}
if($inputtotal.value == ''){
    $inputtotal.style.borderColor ='red'
}if(!$inputtotal.value == ''){
    $inputtotal.style.borderColor ='black'
}
});
