const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('taskList');

window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => renderTask(task.text, task.completed));
};

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task').forEach(taskEl => {
    const text = taskEl.querySelector('.text').textContent;
    const completed = taskEl.classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(taskText, completed = false) {
  const li = document.createElement('li');
  li.className = 'task';
  if (completed) li.classList.add('completed');

  li.innerHTML = `
    <input type="checkbox" ${completed ? 'checked' : ''} />
    <span class="text">${taskText}</span>
    <button class="delete">🗑️</button>
  `;

  li.querySelector('input').addEventListener('change', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  li.querySelector('.delete').addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  list.appendChild(li);
  saveTasks();
}
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });
  
function addTask() {
  const taskText = input.value.trim();
  if (!taskText) return;
  renderTask(taskText);
  input.value = '';
}

addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});
