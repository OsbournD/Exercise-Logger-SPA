document.addEventListener('DOMContentLoaded', function () {
    let storedData = JSON.parse(localStorage.getItem('userData')) || [];

    // Function to display stored data
    function displayData(data)
    {
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = '';

        if (data.length === 0)
        {
            outputDiv.textContent = 'No data stored yet.';
        }
        else
        {
            const ul = document.createElement('ul');
            data.forEach(item =>
            {

                const li = document.createElement('li');
                const exerciseData = parseExerciseData(item);

                if (exerciseData)
                {
                    const exerciseDetails = `Exercise: ${exerciseData.exerciseName}, Date: ${exerciseData.exerciseDate}, Repetitions: ${exerciseData.repetitions}, Weight: ${exerciseData.weight} kg`;
                    li.textContent = exerciseDetails;
                    const deleteBtn = createDeleteButton(item);
                    li.appendChild(deleteBtn);
                    ul.appendChild(li);
                }
            });
            outputDiv.appendChild(ul);
        }
    }

    // Parse exercise data
    function parseExerciseData(item)
    {
        try
        {
            return JSON.parse(item);
        }
        catch (error)
        {
            console.error('Error parsing JSON:', error);
            return null;
        }
    }

    // Create delete button for each exercise
    function createDeleteButton(item)
    {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function ()
        {
            deleteExercise(item);
        });
        return deleteBtn;
    }

    // Delete a specific exercise
    function deleteExercise(item)
    {
        storedData.splice(storedData.indexOf(item), 1);
        localStorage.setItem('userData', JSON.stringify(storedData));
        displayData(storedData);
    }

    // Handle form submission
    function handleFormSubmission(event)
    {
        event.preventDefault();
        const exerciseName = document.getElementById('exerciseName').value.trim();
        const exerciseDate = document.getElementById('exerciseDate').value.trim();
        const repetitions = document.getElementById('repetitions').value.trim();
        const weight = document.getElementById('weight').value.trim();

        if (exerciseName !== '' && exerciseDate !== '' && repetitions !== '' && weight !== '')
        {
            const exerciseData = {
                exerciseName: exerciseName,
                exerciseDate: exerciseDate,
                repetitions: repetitions,
                weight: weight
            };

            storedData.push(JSON.stringify(exerciseData));
            localStorage.setItem('userData', JSON.stringify(storedData));
            displayData(storedData);
            form.reset();
        }
        else
        {
            alert('Please fill in all fields.');
        }
    }

    // Delete all exercises
    function deleteAllExercises()
    {
        const confirmDelete = confirm('Are you sure you want to delete all user data?');

        if (confirmDelete)
        {
            localStorage.removeItem('userData');
            storedData = [];
            displayData([]);
        }
    }

    // Filter exercises by date
    function filterExercises()
    {
        const filterDate = document.getElementById('filterDate').value.trim();

        if (filterDate !== '')
        {
            const filteredData = storedData.filter(item => {
                const exerciseData = JSON.parse(item);
                return exerciseData.exerciseDate === filterDate;
            });
            displayData(filteredData);
        }
        else
        {
            alert('Please select a date to filter.');
        }
    }

    // Search exercises by name
    function searchExercises()
    {
        const searchTerm = document.getElementById('searchBar').value.trim().toLowerCase();

        if (searchTerm == "") {
            alert('Please enter a search term.');
        }

        const filteredData = storedData.filter(item => {
            const exerciseData = JSON.parse(item);
            return exerciseData.exerciseName.toLowerCase().includes(searchTerm);
        });

        displayData(filteredData);
    }

    // Reset filters
    function resetFilters()
    {
        document.getElementById('filterDate').value = '';
        document.getElementById('searchBar').value = '';
        displayData(storedData);
    }

    // Display stored data when the page loads
    displayData(storedData);

    // Event listeners
    const form = document.getElementById('inputForm');
    form.addEventListener('submit', handleFormSubmission);

    const deleteAllBtn = document.getElementById('deleteAllBtn');
    deleteAllBtn.addEventListener('click', deleteAllExercises);

    const filterBtn = document.getElementById('filterBtn');
    filterBtn.addEventListener('click', filterExercises);

    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', searchExercises);

    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    resetFiltersBtn.addEventListener('click', resetFilters);
});
