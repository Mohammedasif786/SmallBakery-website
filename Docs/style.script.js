const FoodItemList = document.getElementById("FoodItemList");
const bodyCart = FoodItemList.querySelectorAll(".bodyCart");
const increase = FoodItemList.querySelectorAll(".increase");
const decrease = FoodItemList.querySelectorAll(".decrease");
const counter = FoodItemList.querySelectorAll(".Counter");
const selected = FoodItemList.querySelectorAll(".selected");
const ImageTag = FoodItemList.querySelectorAll(".ImageTag");
const ProductName = FoodItemList.querySelectorAll(".ProductName");
const ProductPrice = FoodItemList.querySelectorAll(".ProductPrice");
const quantity = document.getElementById("quantity");
const emptyCake = document.getElementById("emptyCake");
const hideText = document.getElementById("hideText");
const CartItems = document.getElementById("CartItems");
const ClosedCart = document.querySelector("#closed");
const Total = document.getElementById("Total");
const ConfirmandDone = document.getElementById('ConfirmandDone');
const FinalParent = document.getElementById('FinalParent');

let DynamicQuantity = new Array(counter.length).fill(0);
let OverAllTotalQuanity = new Array(counter.length).fill(0);
let CartQuantityasMultiply = new Array(counter.length).fill(0);
let ans,qq = DynamicQuantity.length;

function DynamicItemsProduct2({ Names, Prices, quantity, id }) {
  let ProductDy = document.getElementById(id);

  if (ProductDy) {
    const h11 = ProductDy.querySelector("h1.font-semibold");
    const qtySpan = ProductDy.querySelector(`#ItemQuailty${id}`);
    const priceSpan = ProductDy.querySelector("span.font-bold.text-black.ml-4");

    h11.firstChild.textContent = "$" + (Prices * quantity).toFixed(2);
    OverAllTotalQuanity[id.slice(-1)] = (Prices * quantity);
    CartQuantityasMultiply[id.slice(-1)] = quantity; 
    qtySpan.textContent = "x" + quantity;
    priceSpan.textContent = "$" + Prices;
    return;
  }

  ProductDy = document.createElement("div");
  const ProductDy2 = document.createElement("div");
  const h1 = document.createElement("h1");
  const h11 = document.createElement("h1");
  const image = document.createElement("img");
  const span = document.createElement("span");
  const priceSpan = document.createElement("span");
  const hr = document.createElement("hr");

  ProductDy.id = id;
  ProductDy.className = "flex justify-between mb-2";
  h1.className = "font-bold";
  h1.textContent = Names;
  h11.classList = "font-semibold";
  h11.textContent = "$" + (Prices * quantity).toFixed(2);
  span.id = "ItemQuailty" + id;
  span.textContent = "x" + quantity + " ";
  span.style.color = "rgb(206, 100, 0)";
  h11.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  h11.appendChild(span);
  priceSpan.className = "font-bold text-black ml-4";
  priceSpan.textContent = "$" + Prices;
  h11.appendChild(priceSpan);
  ProductDy2.append(h1, h11);
  image.id = "Closed";
  image.src = "../assets/images/icon-remove-item.svg";
  image.className = "w-12 px-4 text-white cursor-pointer ItemR";
  ProductDy.append(ProductDy2, image);
  CartItems.append(ProductDy, hr);
}

CartItems.addEventListener("click", function (et) {
  if (et.target.classList.contains("ItemR")) {
    let carry = this.lastElementChild.previousElementSibling.id;
    let Carry = Number(carry.slice(-1));
    FoodItemList.children[Carry].firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.textContent = 0; //reset

let total = DynamicQuantity.reduce((first, next) => {
    return first + next;
});

  if(!CartItems.childElementCount) {
    Total.textContent = 0;
    FinalParent.cl
  }

  quantity.textContent = `(${total -= DynamicQuantity[Carry]})`;    
  total -= DynamicQuantity[Carry+1];
  DynamicQuantity[Carry+1] = 0

  CartQuantityasMultiply[Carry] = 0; //ArrayStore0

  Total.textContent ='$' + (Total.textContent.slice(1) - OverAllTotalQuanity[Carry]).toFixed(2);
  OverAllTotalQuanity[Carry] = 0;

    et.target.closest(".flex").remove();
  }
});

bodyCart.forEach((abc, index) => {
  abc.addEventListener(
    "click",
    function (et) {
      ans = DynamicQuantity[index] < 0 ? true : false;
      increase[index].classList.toggle("hidden", ans);
      decrease[index].classList.toggle("hidden", ans);

      if (!ans) selected[index].classList.add("outline-2", "outline-[#be4f00]");

      const CarryWithNameandPrices = {
        id: "Food" + index,
        Names: ProductName.item(index).textContent,
        Prices: Number(
          ProductPrice.item(index).textContent.trim().slice(1)
        ).toFixed(2),
        quantity: DynamicQuantity[index],
        
      };
      DynamicItemsProduct2(CarryWithNameandPrices);
      Total.textContent = '$' + OverAllTotalQuanity.reduce((first,last) => {
        return first + last;
      }).toFixed(2);
    },
    { once: false }
  );
  abc.addEventListener(
    "dblclick",
    function (et) {
      DynamicQuantity[index]++;
    },
    { once: true }
  );
});

Array.from(increase).forEach((adding, index) => {
  adding.addEventListener("click", function (et) {
    DynamicQuantity[index]++;
    counter[index].textContent = DynamicQuantity[index];
    AddtoCart(DynamicQuantity[index]);
  });
});

function AddtoCart(rest) {
  if (0 >= rest) emptyCake.src = "../assets/images/illustration-empty-cart.svg";
  else emptyCake.src = "";

  hideText.classList.toggle("hidden", rest);
  let Finaltotal = DynamicQuantity.reduce((first, next) => {
    return first + next;
  });
  quantity.textContent = `(${Finaltotal})`;
}

Array.from(decrease).forEach((subtracting, index) => {
  subtracting.addEventListener("click", function (et) {
    if (DynamicQuantity[index] < 0) return;
    counter[index].textContent = DynamicQuantity[index];
    DynamicQuantity[index]--;
    AddtoCart(DynamicQuantity[index]);
  });
});

ConfirmandDone.addEventListener('click',function(et) {
      FinalParent.classList.toggle('hidden');
      //TODO: 1.CartItems list Shows with same as Cart
      console.log(CartItems.children);
      //TODO: 2.Startnew order btn works like (refresh website[easy])/reset values[Hard](all)
      //FIXME: ON MONDAY🔨 inshallah! 
})