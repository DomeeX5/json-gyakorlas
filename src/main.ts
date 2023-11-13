import { Termek, Termekek } from "./pruduct";

const mindGomb = document.getElementById('mind');
const abcGomb = document.getElementById('abc');
const legdragabbGomb = document.getElementById('legdragabb');
const keresesGomb = document.getElementById('kereses');
const keresInput = document.getElementById('keres');
const ajanlatGomb = document.getElementById('ajanlat');
const lista = document.getElementById('list');

function adatMegjelenites(termekLista: Termek[]){
  lista!.textContent = "";
  termekLista.forEach(e => {
    const li = document.createElement('li');
    lista!.appendChild(li);
    li.innerHTML = e.brand + '; ' + e.title + '; $' + e.price + '; ' + e.description
  });
  
}

function mind(){
  mindGomb!.addEventListener('click', async () => {
    let lekeres = await fetch('products.json');
    let tartalom = await lekeres.json() as Termekek;
    adatMegjelenites(tartalom.products);
  })
}

function abc(){
  abcGomb!.addEventListener('click', async () => {
    let lekeres = await fetch('products.json');
    let tartalom = await lekeres.json() as Termekek;
    let abc_sorrend = tartalom.products.sort((a, b) => a.brand.localeCompare(b.brand))
    adatMegjelenites(abc_sorrend);
    })
  }

function legdragabb(){
  legdragabbGomb!.addEventListener('click', async () => {
    let lekeres = await fetch('products.json');
    let tartalom = await lekeres.json() as Termekek;
    let legdragabbtermek = tartalom.products.sort((a, b) => b.price - a.price)
    adatMegjelenites(legdragabbtermek);
  })
}

function kereses(){
  keresesGomb!.addEventListener('click', async () => {
    let lekeres = await fetch('products.json');
    let tartalom = await lekeres.json() as Termekek;
    let keresett = (keresInput as HTMLInputElement).value;
    let kereses = tartalom.products.filter(a => a.description.toLocaleLowerCase().includes(keresett.toLocaleLowerCase()));
    adatMegjelenites(kereses);
  })
}

function ajanlat(){
  ajanlatGomb!.addEventListener('click', async () => {
    let lekeres = await fetch('products.json');
    let tartalom = await lekeres.json() as Termekek;
    let ajanlat = tartalom.products.filter(a => a.price < 100).sort((a, b) => b.price - a.price);
    adatMegjelenites(ajanlat);
  })
}



document.addEventListener('DOMContentLoaded', () => {
  mind();
  abc();
  legdragabb();
  kereses();
  ajanlat();
})