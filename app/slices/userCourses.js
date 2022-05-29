import { createSlice } from "@reduxjs/toolkit";
import { uuid } from "uuidv4";

const initialState = {
  value: {
    userId: 1,
    numOfCourses: 1,
    data: [
      {
        courseName: "CMSE322",
        courseId: uuid(),
        courseIndex: 0,
        totalNumberOfTasks: 3,
        totalNumberOfMilestones: 6,
        totalNumberOfCompletedMilestones: 3,
        tasks: [
          {
            taskName: "SRS Report",
            taskId: uuid(),
            taskIndex: 0,
            numOfMilestones: 2,
            completedMilestones: 1,
            milestones: [
              {
                milestoneName: "Write Introduction",
                milestoneId: uuid(),
                milestoneIndex: 0,
                isCompleted: true,
                deadline: "",
              },
              {
                milestoneName: "Write functional reqs",
                milestoneId: uuid(),
                milestoneIndex: 1,
                isCompleted: false,
              },
            ],
          },
          {
            taskName: "SDS Report",
            taskId: uuid(),
            taskIndex: 1,
            numOfMilestones: 2,
            completedMilestones: 0,
            milestones: [
              {
                milestoneName: "Design",
                milestoneId: uuid(),
                milestoneIndex: 0,
                isCompleted: false,
              },
              {
                milestoneName: "Die",
                milestoneId: uuid(),
                milestoneIndex: 1,
                isCompleted: false,
              },
            ],
          },
          {
            taskName: "Deliver",
            taskId: uuid(),
            taskIndex: 2,
            numOfMilestones: 2,
            completedMilestones: 2,
            milestones: [
              {
                milestoneName: "Display Demo",
                milestoneId: uuid(),
                milestoneIndex: 0,
                isCompleted: true,
              },
              {
                milestoneName: "end",
                milestoneId: uuid(),
                milestoneIndex: 1,
                isCompleted: true,
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
    setData: (state, action) => {
      (state.value.userId = action.payload.userId),
        (state.value.data = action.payload.data);
    },
    addCourse: (state, action) => {
      console.log(action.payload.value);
      console.log(state.value.numOfCourses);
      let currentIndex = state.value.numOfCourses;
      state.value.data.push({
        courseName: action.payload.value.toUpperCase(),
        courseId: uuid(),
        courseIndex: currentIndex,
        totalNumberOfTasks: 0,
        totalNumberOfMilestones: 0,
        totalNumberOfCompletedMilestones: 0,
        tasks: [],
      });

      state.value.numOfCourses += 1;
    },
    removeCourse: (state, action) => {
      //   console.log(action.payload);
      const { courseIndex } = action.payload;
      state.value.data = state.value.data.filter((_, i) => courseIndex !== i);
      state.value.numOfCourses--;
      state.value.data.forEach((e, i) => {
        e.courseIndex = i;
      });
      console.log(state.value.data);
    },
    addTasks: (state, action) => {
      const { courseIndex } = action.payload;
      const { data } = state.value;
      data[courseIndex].totalNumberOfTasks += 1;
      data[courseIndex].totalNumberOfMilestones += 1;
      data[courseIndex].tasks.push({
        taskName: "Task Name (Click on me to edit)",
        taskId: uuid(),
        taskIndex: data[courseIndex].totalNumberOfTasks - 1,
        numOfMilestones: 1,
        completedMilestones: 0,
        milestones: [
          {
            milestoneName: "Edit me",
            milestoneIndex: 0,
            isCompleted: false,
          },
        ],
      });
      //   console.log(data);
      //   state.value.data[action.payload.courseIndex] = action.payload.tasks;
    },
    removeTask: (state, action) => {
      const { courseIndex, taskIndex, taskName } = action.payload;
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
      state.value.data[courseIndex].tasks.forEach((e, i) => {
        e.taskIndex = i;
      });
      // Decrease total number of tasks
      state.value.data[courseIndex].totalNumberOfTasks--;
    },
    editTaskName: (state, action) => {
      const { courseIndex, taskIndex, taskName } = action.payload;
      console.log(courseIndex, taskIndex, taskName.value);
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
        milestoneId: uuid(),
        milestoneIndex:
          state.value.data[courseIndex].tasks[taskIndex].numOfMilestones,
        isCompleted: false,
      });
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
      // Remove Item
      state.value.data[courseIndex].tasks[taskIndex].milestones =
        state.value.data[courseIndex].tasks[taskIndex].milestones.filter(
          (_, i) => i !== milestoneIndex
        );
      //Handle number of milestones
      state.value.data[courseIndex].totalNumberOfMilestones -= 1;
      state.value.data[courseIndex].tasks[taskIndex].numOfMilestones -= 1;
      state.value.data[courseIndex].tasks[taskIndex].milestones.forEach(
        (e, i) => {
          e.milestoneIndex = i;
        }
      );
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
} = courseDataSlice.actions;

export default courseDataSlice.reducer;
