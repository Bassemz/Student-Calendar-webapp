import { createSlice } from "@reduxjs/toolkit";
import { returnDateStringWithoutMonth } from "../../usefulFunctions";
// import { uuid } from "uuidv4";

let courseIdCounter = 1;
let taskIdCounter = 3;
let milestoneIdCounter = 6;

const initialState = {
  value: {
    userId: 1,
    numOfCourses: 1,
    data: [
      {
        courseName: "CMSE322",
        courseId: 0,
        courseIndex: 0,
        totalNumberOfTasks: 3,
        totalNumberOfMilestones: 6,
        totalNumberOfCompletedMilestones: 3,
        tasks: [
          {
            taskName: "SRS Report",
            taskId: 0,
            taskIndex: 0,
            numOfMilestones: 2,
            completedMilestones: 1,
            taskStartTime: "2022-05-26",
            milestones: [
              {
                milestoneName: "Write Introduction",
                milestoneId: 0,
                milestoneIndex: 0,
                isCompleted: true,
                deadline: "2022-05-27",
              },
              {
                milestoneName: "Write functional reqs",
                milestoneId: 1,
                // milestoneIndex: 1,
                isCompleted: false,
                deadline: "2022-05-29",
              },
            ],
          },
          {
            taskName: "SDS Report",
            taskId: 1,
            taskIndex: 1,
            numOfMilestones: 2,
            completedMilestones: 0,
            taskStartTime: "2022-05-30",
            milestones: [
              {
                milestoneName: "Design",
                milestoneId: 2,
                milestoneIndex: 0,
                isCompleted: false,
                deadline: "2022-06-01",
              },
              {
                milestoneName: "Die",
                milestoneId: 3,
                milestoneIndex: 1,
                isCompleted: false,
                deadline: "2022-06-02",
              },
            ],
          },
          {
            taskName: "Deliver",
            taskId: 2,
            taskIndex: 2,
            numOfMilestones: 2,
            completedMilestones: 2,
            taskStartTime: "2022-06-03",
            milestones: [
              {
                milestoneName: "Display Demo",
                milestoneId: 4,
                milestoneIndex: 0,
                isCompleted: true,
                deadline: "2022-06-05",
              },
              {
                milestoneName: "end",
                milestoneId: 5,
                milestoneIndex: 1,
                isCompleted: true,
                deadline: "2022-06-07",
              },
            ],
          },
        ],
      },
    ],
  },
};

export const courseDataSlice = createSlice({
  name: "userCourses",
  initialState,
  reducers: {
    //Intended for back-end with the API calls
    setData: (state, action) => {
      (state.value.userId = action.payload.userId),
        (state.value.data = action.payload.data);
    },
    //Add courses
    addCourse: (state, action) => {
      //   console.log(action.payload.value);
      //   console.log(state.value.numOfCourses);
      let currentIndex = state.value.numOfCourses;
      state.value.data.push({
        courseName: action.payload.value.toUpperCase(),
        courseId: courseIdCounter,
        courseIndex: currentIndex,
        totalNumberOfTasks: 0,
        totalNumberOfMilestones: 0,
        totalNumberOfCompletedMilestones: 0,
        tasks: [],
      });
      courseIdCounter++;
      state.value.numOfCourses += 1;
    },
    removeCourse: (state, action) => {
      //   console.log(action.payload);
      const { courseIndex } = action.payload;
      state.value.data = state.value.data.filter((_, i) => courseIndex !== i);
      //   state.value.data.forEach((e, i) => {
      //     e.courseIndex = i;
      //   });
      //   let increment = 0;
      //   state.value.data = state.value.data.map((e, i) => {
      //     if (courseIndex !== i) {
      //       e.courseIndex = increment;
      //       increment++;
      //       return e;
      //     }
      //   });
      state.value.numOfCourses--;
      //   console.log(state.value.data);
    },
    addTasks: (state, action) => {
      const { courseIndex } = action.payload;
      const { data } = state.value;
      data[courseIndex].totalNumberOfTasks += 1;
      data[courseIndex].totalNumberOfMilestones += 1;
      data[courseIndex].tasks.push({
        taskName: "Task Name (Click on me to edit)",
        taskId: taskIdCounter,
        taskIndex: data[courseIndex].totalNumberOfTasks - 1,
        numOfMilestones: 1,
        completedMilestones: 0,
        taskStartTime: returnDateStringWithoutMonth(new Date()),

        milestones: [
          {
            milestoneName: "Edit me",
            milestoneId: milestoneIdCounter,
            milestoneIndex: 0,
            isCompleted: false,
            deadline: returnDateStringWithoutMonth(new Date()),
          },
        ],
      });
      taskIdCounter++;
      milestoneIdCounter++;
      //   console.log(data);
      //   state.value.data[action.payload.courseIndex] = action.payload.tasks;
    },
    removeTask: (state, action) => {
      const { courseIndex, taskIndex } = action.payload;
      // Decrease total number of milestones
      console.log("Deleting task with task id", taskIndex);
      console.log(state.value.data[courseIndex]);
      state.value.data[courseIndex].totalNumberOfMilestones -=
        state.value.data[courseIndex].tasks[taskIndex].numOfMilestones;
      // Decrease total number of completed milestones
      state.value.data[courseIndex].totalNumberOfCompletedMilestones -=
        state.value.data[courseIndex].tasks[taskIndex].completedMilestones;
      // Remove the element from the tasks array
      state.value.data[courseIndex].tasks = state.value.data[
        courseIndex
      ].tasks.filter((_, i) => i !== taskIndex);
      // Reorder the indexes
      //   state.value.data[courseIndex].tasks.forEach((e, i) => {
      //     e.taskIndex = i;
      //   });
      //   let increment = 0;
      //   state.value.data[courseIndex].tasks = state.value.data[
      //     courseIndex
      //   ].tasks.map((e, i) => {
      //     if (courseIndex !== i) {
      //       e.taskIndex = increment;
      //       increment++;
      //       console.log("task Index: ", e.taskIndex);
      //       return e;
      //     }
      //   });

      // Decrease total number of tasks
      state.value.data[courseIndex].totalNumberOfTasks--;
    },
    editTaskName: (state, action) => {
      const { courseIndex, taskIndex, taskName } = action.payload;
      //   console.log(courseIndex, taskIndex, taskName.value);
      state.value.data[courseIndex].tasks[taskIndex].taskName = taskName.value;
    },
    markMilestone: (state, action) => {
      const { courseIndex, taskIndex, milestoneIndex, milestoneStatus } =
        action.payload;
      const { data } = state.value;
      const { isCompleted } =
        data[courseIndex].tasks[taskIndex].milestones[milestoneIndex];
      data[courseIndex].tasks[taskIndex].milestones[
        milestoneIndex
      ].isCompleted = milestoneStatus;

      // Handle completed milestones number
      if (isCompleted) {
        data[courseIndex].totalNumberOfCompletedMilestones -= 1;
        data[courseIndex].tasks[taskIndex].completedMilestones -= 1;
      } else {
        data[courseIndex].totalNumberOfCompletedMilestones += 1;
        data[courseIndex].tasks[taskIndex].completedMilestones += 1;
      }
    },
    addMilestone: (state, action) => {
      const { courseIndex, taskIndex } = action.payload;
      //   state.value.data[courseIndex].tasks[taskIndex].milestones.push(milestone);
      state.value.data[courseIndex].tasks[taskIndex].milestones.push({
        milestoneName: "Edit me",
        milestoneId: milestoneIdCounter,
        milestoneIndex:
          state.value.data[courseIndex].tasks[taskIndex].numOfMilestones,
        isCompleted: false,
        deadline: new Date(),
      });
      milestoneIdCounter++;
      state.value.data[courseIndex].totalNumberOfMilestones += 1;
      state.value.data[courseIndex].tasks[taskIndex].numOfMilestones += 1;
    },
    removeMilestone: (state, action) => {
      //Extract necessary variables
      const { courseIndex, taskIndex, milestoneIndex, isCompleted } =
        action.payload;

      if (
        state.value.data[courseIndex].tasks[taskIndex].numOfMilestones === 1
      ) {
        return;
      }
      state.value.data[courseIndex].tasks[taskIndex].milestones =
        state.value.data[courseIndex].tasks[taskIndex].milestones.filter(
          (_, i) => milestoneIndex !== i
        );
      // Remove Item
      //   let increment = 0;
      //   state.value.data[courseIndex].tasks[taskIndex].milestones =
      //     state.value.data[courseIndex].tasks[taskIndex].milestones.map(
      //       (e, i) => {
      //         if (milestoneIndex !== i) {
      //           e.milestoneIndex = increment;
      //           increment++;
      //           return e;
      //         }
      //       }
      //     );
      //Handle number of milestones
      state.value.data[courseIndex].totalNumberOfMilestones -= 1;
      state.value.data[courseIndex].tasks[taskIndex].numOfMilestones -= 1;
      //   state.value.data[courseIndex].tasks[taskIndex].milestones.forEach(
      //     (e, i) => {
      //       e.milestoneIndex = i;
      //     }
      //   );
      if (isCompleted) {
        state.value.data[courseIndex].totalNumberOfCompletedMilestones -= 1;
        state.value.data[courseIndex].tasks[taskIndex].completedMilestones -= 1;
      }
    },
    editMilestone: (state, action) => {
      const { courseIndex, taskIndex, milestoneIndex, milestoneName } =
        action.payload;
      state.value.data[courseIndex].tasks[taskIndex].milestones[
        milestoneIndex
      ].milestoneName = milestoneName;
    },
    editCourseName: (state, action) => {
      const { courseIndex, courseName } = action.payload;
      state.value.data[courseIndex].courseName = courseName;
    },
    editTaskStartTime: (state, action) => {
      const { courseIndex, taskIndex, newStartDate } = action.payload;
      state.value.data[courseIndex].tasks[taskIndex].taskStartTime =
        newStartDate;
    },
    editMilestoneEndTime: (state, action) => {
      const { courseIndex, taskIndex, milestoneIndex, newEndDate } =
        action.payload;
      state.value.data[courseIndex].tasks[taskIndex].milestones[
        milestoneIndex
      ].deadline = newEndDate;
    },
  },
});

export const {
  setData,
  addCourse,
  removeCourse,
  addTasks,
  removeTask,
  editTaskName,
  markMilestone,
  addMilestone,
  removeMilestone,
  editMilestone,
  editCourseName,
  editTaskStartTime,
  editMilestoneEndTime,
} = courseDataSlice.actions;

export default courseDataSlice.reducer;
