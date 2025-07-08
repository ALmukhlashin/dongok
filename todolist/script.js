// Ambil elemen penting dari HTML
const list = document.getElementById("todo-list");
const input = document.getElementById("new-task");
const btn = document.getElementById("btn");

// Ambil data dari localStorage saat halaman dibuka
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  list.innerHTML = ""; // Kosongkan daftar

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    checkbox.addEventListener("change", () => {
      todos[index].done = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createTextNode(todo.text);

    // Tombol hapus
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "auto";
    deleteBtn.style.background = "transparent";
    deleteBtn.style.border = "none";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.fontSize = "1rem";
    deleteBtn.title = "Hapus";

    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1); // Hapus tugas dari array
      saveTodos();
      renderTodos();
    });

    if (todo.done) {
      li.style.textDecoration = "line-through";
      li.style.color = "#888";
    }

    li.style.display = "flex";
    li.style.alignItems = "center";

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn); // ← Tambahkan tombol hapus
    list.appendChild(li);
  });
}


// Fungsi untuk menyimpan ke localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Event saat tombol "Add" diklik
btn.addEventListener("click", () => {
  const task = input.value.trim();
  if (task !== "") {
    todos.push({ text: task, done: false });
    input.value = "";
    saveTodos();
    renderTodos();
  }
});

// Jalankan saat pertama kali
renderTodos();
