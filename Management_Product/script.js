document.addEventListener("DOMContentLoaded", function () {
  fetch("https://ea1a-125-164-19-28.ngrok-free.app/product", {
    mode: "cors",
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const productCard = document.getElementById("card");

      const productNameElement = data.data.forEach((produk) => {
        const newButton = document.createElement("button");

        const newImage = document.createElement("img");
        newImage.src = `https://ea1a-125-164-19-28.ngrok-free.app${produk.image}`;

        const nameElement = document.createElement("p");
        nameElement.textContent = produk.name;

        const priceElement = document.createElement("p");
        priceElement.textContent = produk.price;

        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add To Cart";

        //DELETE
        const del = document.createElement("button");
        del.textContent = "DELETE";
        del.onclick = function () {
          const productId = this.dataset.productId;
          fetch(
            `https://ea1a-125-164-19-28.ngrok-free.app/product/${productId}`,
            {
              method: "DELETE",
            }
          )
            .then((res) => res.json())
            .then((json) => console.log(json));
          return false;
        };
        del.dataset.productId = produk.id;

        //EDIT
        const edit = document.createElement("button");
        edit.textContent = "EDIT";
        edit.onclick = function () {
          // Buat elemen input untuk mengedit
          const newNameInput = document.createElement("input");
          newNameInput.value = produk.name;

          // const newDescInput = document.createElement("input");
          // newDescInput.value = produk.description;

          const newPriceInput = document.createElement("input");
          newPriceInput.value = produk.price;

          // Buat tombol simpan
          const saveButton = document.createElement("button");
          saveButton.textContent = "SAVE";
          saveButton.onclick = function () {
            const newProductName = newNameInput.value;
            // const newProductDesc = newDescInput.value;
            const newProductPrice = newPriceInput.value;
            const productId = produk.id;

            // Kirim permintaan PUT dengan data yang diperbarui
            fetch(
              `https://ea1a-125-164-19-28.ngrok-free.app/product/${productId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: newProductName,
                  // description: newDescInput,
                  price: newProductPrice,
                }),
              }
            )
              .then((res) => res.json())
              .then((json) => {
                console.log(json);
                // Perbarui tampilan nama dan harga produk
                nameElement.textContent = newProductName;
                // descriptionElement.textContent = newProductDesc;
                priceElement.textContent = newProductPrice;
                // Hapus elemen input dan tombol simpan setelah menyimpan
                this.parentNode.removeChild(newNameInput);
                // this.parentNode.removeChild(newDescInput);
                this.parentNode.removeChild(newPriceInput);
                this.parentNode.removeChild(saveButton);
              })
              .catch((error) =>
                console.error("Error updating product:", error)
              );
            return false;
          };
          newButton.appendChild(newNameInput);
          // newButton.appendChild(newDescInput);
          newButton.appendChild(newPriceInput);
          newButton.appendChild(saveButton);
        };

        // newButton.innerHTML = `${produk.name}<br>${produk.price}`;

        // newButton.addEventListener("click", function () {});

        newButton.appendChild(newImage);
        newButton.appendChild(nameElement);
        //newButton.appendChild(descriptionElement);
        newButton.appendChild(priceElement);
        //newButton.appendChild(addToCartButton);
        newButton.appendChild(edit);
        newButton.appendChild(del);

        productCard.appendChild(newButton);
      });
     
    
    })
    .catch((error) => console.error("Error fetching products:", error));
});
