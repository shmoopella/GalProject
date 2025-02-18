const realInput = document.querySelector("#real-input");
const customButton = document.querySelector("#custom-button");
const fileName = document.querySelector("#file-name");

// Обработчик клика на кастомную кнопку
customButton.addEventListener("click", () => {
  realInput.click(); // Имитируем клик на реальном input
});

// Обновление надписи при выборе файла
realInput.addEventListener("change", function () {
  if (this.files.length > 0) {
    fileName.textContent = this.files[0].name;
  } else {
    fileName.textContent = "Файл не выбран";
  }
});

function convertFile() {
  const fileInput = document.querySelector("#real-input");
  const file = fileInput.files[0];

  if (!file) {
    alert("Выберите файл!");
    return;
  }
  let newStr = "";
  const reader = new FileReader();
  reader.onload = function (e) {
    const arr = e.target.result.split(/\r?\n/);

    for (let str of arr) {
      let clearArr = [];
      for (let item of str.trim().split(" ")) {
        if (item !== "") {
          clearArr.push(item);
        }
      }
      newStr +=
        clearArr[1] +
        "," +
        clearArr[2] +
        "," +
        clearArr[3] +
        "," +
        clearArr[4] +
        "\n";
    }
    const blob = new Blob([newStr], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted_" + file.name;
    link.click();
  };
  reader.readAsText(file);
}
