import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    userId: 1,
    data: [
      {
        courseName: "CMSE322",
        courseDatabaseId: 545,
        totalNumberOfMilestones: 6,
        totalNumberOfCompletedMilestones: 3,
        tasks: [
          {
            taskName: "SRS Report",
            taskDatabaseId: 300,
            numOfMilestones: 2,
            completedMilestones: 1,
            milestones: [
              {
                milestoneName: "Write Introduction",
                isCompleted: true,
              },
              {
                milestoneName: "Write functional reqs",
                isCompleted: false,
              },
            ],
          },
          {
            taskName: "SDS Report",
            taskDatabaseId: 301,
            numOfMilestones: 2,
            completedMilestones: 0,
            milestones: [
              {
                milestoneName: "Design",
                isCompleted: false,
              },
              {
                milestoneName: "Die",
                isCompleted: false,
              },
            ],
          },
          {
            taskName: "Deliver",
            taskDatabaseId: 302,
            numOfMilestones: 2,
            completedMilestones: 2,
            milestones: [
              {
                milestoneName: "Display Demo",
                isCompleted: true,
              },
              {
                milestoneName: "end",
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
      state.value.data.push({
        courseName: action.payload,
        totalNumberOfMilestones: 0,
        totalNumberOfCompletedMilestones: 0,
        tasks: [],
      });
    },
    removeCourse: (state, action) => {
      state.value.data.filter((item) => item.courseName !== action.payload);
    },
    addTasks: (state, action) => {
      state.value.data[action.payload.courseIndex] = action.payload.tasks;
    },
    removeTask: (state, action) => {
      state.value.data[action.payload.courseIndex].tasks.filter(
        (item) => item.taskName !== action.payload.taskName
      );
    },
    markMilestone: (state, action) => {
      state.value.data[action.payload.courseIndex].tasks[
        action.payload.taskIndex
      ].milestones[action.payload.milestoneIndex].isCompleted =
        action.payload.milestoneStatus;
      if (action.payload.milestoneStatus) {
        state.value.data[
          action.payload.courseIndex
        ].totalNumberOfCompletedMilestones += 1;
        state.value.data[action.payload.courseIndex].tasks[
          action.payload.taskIndex
        ].completedMilestones += 1;
      }
    },
    addMilestone: (state, action) => {
      const { courseIndex, taskIndex, milestone } = action.payload;
      state.value.data[courseIndex].tasks[taskIndex].milestones.push(milestone);
      state.value.data[courseIndex].totalNumberOfMilestones += 1;
      state.value.data[courseIndex].tasks[taskIndex].numOfMilestones += 1;
    },
    removeMilestone: (state, action) => {
      const { courseIndex, taskIndex, milestone } = action.payload;
      state.value.data[courseIndex].tasks[taskIndex].milestones.filter(
        (item) => item.milestoneName !== milestone.milestoneName
      );
      state.value.data[courseIndex].totalNumberOfMilestones -= 1;
      state.value.data[courseIndex].tasks[taskIndex].numOfMilestones -= 1;
      if (milestone.isCompleted) {
        state.value.data[
          action.payload.courseIndex
        ].totalNumberOfCompletedMilestones -= 1;
        state.value.data[action.payload.courseIndex].tasks[
          action.payload.taskIndex
        ].completedMilestones -= 1;
      }
    },
  },
});

export const {
  setData,
  addCourse,
  removeCourse,
  addTasks,
  removeTask,
  markMilestone,
  addMilestone,
  removeMilestone,
} = courseDataSlice.actions;

export default courseDataSlice.reducer;
