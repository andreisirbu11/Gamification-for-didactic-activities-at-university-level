function toggleContent(divId) {
    var div = document.getElementById(divId);


    var breakdownGradesContent = "<p>Content for Breakdown Grades</p>";
    var totalGradesContent = "<p>Content for Total Grades</p>";

    if (divId === 'breakdown-grades') {
        div.innerHTML = div.innerHTML === breakdownGradesContent ? "<h3>Breakdown Grades</h3>" : breakdownGradesContent;
    } else if (divId === 'total-grades') {
        div.innerHTML = div.innerHTML === totalGradesContent ? "<h3>Total Grades</h3>" : totalGradesContent;
    }
}

document.addEventListener('DOMContentLoaded', function () {

    var dataAlice = [1, 2, 3, 4, 5]; 
    var dataBob = [6, 7, 8, 9, 10];  
    var dataCharlie = [1, 3, 5, 7, 9]; 
    var dataDiana = [2, 4, 6, 8, 10];  
    var dataEdward = [5, 4, 3, 2, 1]; 

     function createChart(chartId, data) {
         var ctx = document.getElementById(chartId).getContext('2d');
         return new Chart(ctx, {
             type: 'bar', 
             data: {
                 labels: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5'],
                 datasets: [{
                     label: 'Quiz Scores',
                     data: data,
                     backgroundColor: 'rgba(0, 123, 255, 0.5)',
                     borderColor: 'rgba(0, 123, 255, 1)',
                     borderWidth: 1
                 }]
             },
             options: {
                scales: {
                    y: {
                        beginAtZero: true, 
                        max: 10
                    }
                }
             }
         });
     }

   
    createChart('aliceChart', dataAlice);
    createChart('bobChart', dataBob);
    createChart('charlieChart', dataCharlie);
    createChart('dianaChart', dataDiana);
    createChart('edwardChart', dataEdward);

    var breakdownGradesDiv = document.getElementById('breakdown-grades');
    var totalGradesDiv = document.getElementById('total-grades');
    var breakdownDetailsDiv = document.getElementById('breakdown-details');
    var totalDetailsDiv = document.getElementById('total-details');

    breakdownGradesDiv.addEventListener('click', function() {
        toggleDetails(breakdownDetailsDiv, totalDetailsDiv);
    });

    totalGradesDiv.addEventListener('click', function() {
        toggleDetails(totalDetailsDiv, breakdownDetailsDiv);
    });

    function toggleDetails(detailsDivToShow, detailsDivToHide) {
        if (detailsDivToShow.style.display === 'none') {
            detailsDivToShow.style.display = 'block';
            detailsDivToHide.style.display = 'none';
        } else {
            detailsDivToShow.style.display = 'none';
            detailsDivToHide.style.display = 'block';
        }
    }
});


function openTab(evt, studentName) {
    var i, tabcontent, tablinks;

    
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    
    document.getElementById(studentName).style.display = "block";
    evt.currentTarget.className += " active";

    
    toggleContent(studentName);
}
