// Randomly associate PDFs with tasks
const pdfOrder = Array.from({ length: 10 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
console.log(pdfOrder);

// Dynamic PDF switching for tasks
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button');
    const tasks = document.querySelectorAll('.sidebar a');
    const instructions = document.getElementById('instrxns');
    const pdfViewer = document.querySelector('.pdf-viewer');
  
    let interactionLocked = false;
    let currentTask = 1;
    let maxTaskReached = 1;
  
    // Shadow timer: disable interaction after 2 minutes
    setTimeout(() => {
      interactionLocked = true;
      disableAllInteractions();
      alert("You have completed 60 minutes of task time. You have already finished this study.");
    }, 60 * 60 * 1000); // 60 minutes
  
    function disableAllInteractions() {
      buttons.forEach(btn => {
        btn.style.opacity = '0.5';
      });
      tasks.forEach(task => {
        task.style.opacity = '0.5';
      });
    }
  
    // Disable previous task tasks
    function updateTask() {
      tasks.forEach((task, index) => {
        const taskNum = index + 1;
        if (taskNum == currentTask) {
          task.classList.add('current-task');
        }
        if (taskNum < maxTaskReached) {
          task.style.opacity = '0.5';
        }
      });
    }
  
    // Button click feedback
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (interactionLocked) return;
  
        if (btn.textContent === 'Next') {
            if (currentTask < tasks.length) {
              currentTask++;
              maxTaskReached = Math.max(maxTaskReached, currentTask);
              updateTask();
              instructions.textContent = `Please read the instructions for Task ${currentTask} carefully before proceeding.`;
              pdfViewer.src = `${pdfOrder[currentTask-1]}.pdf`;
              tasks.forEach(l => l.classList.remove('current-task'));
              tasks[currentTask - 1].classList.add('current-task');

              if (currentTask === 10) {
                btn.style.display = 'none'; // Remove the Next button on task 10
              }
            }
        }
  
        else if (btn.textContent === 'Finished') {
          if(currentTask === 10) alert('Finished!');
          else alert('Are you sure you have completed this task? If so, please click next. ')
        }
      });
    });
  
    // Update PDF and instruction text based on selected task
    tasks.forEach((task, index) => {
      task.addEventListener('click', (e) => {
        if (interactionLocked) return;
        e.preventDefault();
        const taskNum = index + 1;
        if (taskNum >= maxTaskReached) {
          currentTask = taskNum;
          instructions.textContent = `Please read the instructions for Task ${taskNum} carefully before proceeding.`;
          pdfViewer.src = `${pdfOrder[taskNum-1]}.pdf`;
          tasks.forEach(l => l.classList.remove('current-task'));
          tasks[index].classList.add('current-task');
          updateTask();
        }
      });
    });
  
    updateTask();
  });

// Function to handle start page
function startTasks() {
    document.querySelector('.start-page').style.display = 'none';
    document.querySelector('.container').style.display = 'flex';
    document.querySelector('.instructions').textContent = 'Please read the instructions carefully before proceeding.';
    document.querySelector('.pdf-viewer').src = `${pdfOrder[0]}.pdf`;
    document.querySelector('.sidebar').style.display = 'block';
}
