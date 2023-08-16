let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let total = document.getElementById("total");
let mood = "create";
let tmp;

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

//  create product
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  //  count
  // if (title.value!='') {

  // }
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newpro.count < 101
  ) {
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[tmp] = newpro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(datapro));

  showData();
};
//  save localstorge

//  clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}
//  read

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
  </tr> `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btndelete = document.getElementById("deleteAll");
  if (datapro.length > 0) {
    btndelete.innerHTML = `
    <button onclick='deleteAll()'>deleteAll (${datapro.length})</button>`;
  } else {
    btndelete.innerHTML = "";
  }
}
showData();
//  delete

function deleteData(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showData();
}
function deleteAll() {
  localStorage.clear();
  datapro.splice(0);
  showData();
}

//  update
function updateData(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  category.value = datapro[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//  search

let SearchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("Search");
  if (id == "searchTitle") {
    SearchMood = "title";
  } else {
    SearchMood = "category";
  }
  search.placeholder = "search By " + SearchMood;
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    if (SearchMood == "title") {
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
          <td>${i}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].ads}</td>
          <td>${datapro[i].discount}</td>
          <td>${datapro[i].total}</td>
          <td>${datapro[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
        </tr> `;
      }
    } else {
      {
        if (datapro[i].category.includes(value.toLowerCase())) {
          table += `
          <tr>
          <td>${i}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].ads}</td>
          <td>${datapro[i].discount}</td>
          <td>${datapro[i].total}</td>
          <td>${datapro[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
        </tr> `;
        }
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
//  clean data
