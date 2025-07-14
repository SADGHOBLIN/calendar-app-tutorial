<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Calendar App Project</title>
        <meta name="description" content="Calendar app project tutorial">
        <!-- CSS stylesheet -->
        <link rel="stylesheet" href="style.css">
    </head>

    <body>

    <header>
        <!-- Header section -->
        <h1><i class="fa-regular fa-calendar"></i> Calendar</h1>
    </header>
        <!-- Clock -->
        <div class="clock-container">
            <div id="clock"></div>
        </div>

    <main>
        <!-- Calendar section-->
         <div class="calendar">
            <!-- Nav buttons -->
            <div class="nav-btn-container">
                    <button class="nav-btn"><i class="fa-regular fa-square-caret-left"></i></button>
                    <h2 id="monthYear" stlye="margin: 0"></h2>
                    <button class="nav-btn"><i class="fa-regular fa-square-caret-right"></i></button>
            </div>

            <!-- Calendar grid -->
             <div id="calendar" class="calendar-grid">

             </div>
         </div>

         <!-- Modal for add/edit/delete appointment -->
          <div id="eventModal" class="modal">
            <div class="modal-content">

                <div id="eventSelectorWrapper">
                    <label for="eventSelector">
                        <strong>Select Event:</select>
                    </label>
                    <select name="" id="eventSelector">
                        <option value="" disabled selected>Choose Event...</option>
                    </select>
                </div>

                <!-- Main form -->
                <form method="POST" id="eventForm">
                        <input type="hidden" name="action" id="formAction" value="add">
                        <input type="hidden" name="event_id" id="eventID">

                        <label for="courseName">Course Title:</label>
                        <input type="text" name="course_name" id="courseName" required>

                        <label for="instructorName">Instructor Name:</label>
                        <input type="text" name="instructor_name" id="instructorName" required>

                        <label for="startDate">Start Date:</label>
                        <input type="date" name="start_date" id="startDate" required>

                        <label for="endDate">End Date:</label>
                        <input type="date" name="end_date" id="endDate" required>

                        <label for="startTime">Start Time:</label>
                        <input type="time" name="start_time" id="startTime" required>

                        <label for="endTime">End Time:</label>
                        <input type="time" name="end_time" id="endTime" required>
                        

                        <button type="submit"><i class="fa-solid fa-calendar-check"></i> Save</button>
                </form>

                <!-- Delete form -->
                    <form method="POST">
                        <input type="hidden" name="action" value="delete">
                        <input type="hidden" name="event_id" id="deleteEventID">
                        <button type="submit" class="submit-btn"><i class="fa-solid fa-trash-can"></i> Delete</button>
                    </form>

                    <!-- Cancel action -->
                    <button type="button" class="submit-btn"><i class="fa-solid fa-square-xmark"></i> Cancel</button>
            </div>
         </div>

    </main>


    <!-- Font Awesome icon kit -->
     <script src="https://kit.fontawesome.com/3362ba5870.js" crossorigin="anonymous"></script>
    <!-- Calendar script -->
     <script src="caldendar.js"></script>
    </body>


</html>