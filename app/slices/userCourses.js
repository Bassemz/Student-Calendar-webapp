import { createSlice } from "@reduxjs/toolkit";
import { returnDateStringWithoutMonth, withOut } from "../../usefulFunctions";
// import { uuid } from "uuidv4";

let courseIdCounter = 1;
let taskIdCounter = 3;
let milestoneIdCounter = 6;

const initialState = {
  value: {
    userId: 1,
    courses: {
      byId: {
        c_0: {
          courseName: "CMSE322",
          tasks: ["t_0", "t_1", "t_2"],
          totalNumberOfTasks: 3,
          totalNumberOfMilestones: 6,
          totalNumberOfCompletedMilestones: 3,
        },
      },
      allCourseIds: ["c_0"],
    },
    tasks: {
      byId: {
        t_0: {
          taskName: "SRS Report",
          courseId: "c_0",
          numOfMilestones: 2,
          completedMilestones: 1,
          taskStartTime: "2022-05-26",
          milestones: ["m_0", "m_1"],
        },
        t_1: {
          taskName: "SDS Report",
          courseId: "c_0",
          numOfMilestones: 2,
          completedMilestones: 0,
          taskStartTime: "2022-05-30",
          milestones: ["m_2", "m_3"],
        },
        t_2: {
          taskName: "Deliver",
          courseId: "c_0",
          numOfMilestones: 2,
          completedMilestones: 2,
          taskStartTime: "2022-06-03",
          milestones: ["m_4", "m_5"],
        },
      },
      allTaskIds: ["t_0", "t_1", "t_2"],
    },
    milestones: {
      byId: {
        m_0: {
          courseId: "c_0",
          taskId: "t_0",
          milestoneName: "Write Introduction",
          isCompleted: true,
          deadline: "2022-05-27",
        },
        m_1: {
          courseId: "c_0",
          taskId: "t_0",
          milestoneName: "Write functional reqs",
          isCompleted: false,
          deadline: "2022-05-29",
        },
        m_2: {
          courseId: "c_0",
          taskId: "t_1",
          milestoneName: "Design",
          isCompleted: false,
          deadline: "2022-06-01",
        },
        m_3: {
          courseId: "c_0",
          taskId: "t_1",
          milestoneName: "Design",
          isCompleted: false,
          deadline: "2022-06-02",
        },
        m_4: {
          courseId: "c_0",
          taskId: "t_2",
          milestoneName: "Display demo",
          isCompleted: true,
          deadline: "2022-06-05",
        },
        m_5: {
          courseId: "c_0",
          taskId: "t_2",
          milestoneName: "Display demo",
          isCompleted: true,
          deadline: "2022-06-07",
        },
      },
      allMilestoneIds: ["m_0", "m_1", "m_2", "m_3", "m_4", "m_5"],
    },
    calendar: {
      byId: {
        "2022-05-27": {
          byId: {
            c_0: {
              t_0: ["m_0"],
              allTaskIds: ["t_0"],
            },
          },
          allCourseIds: ["c_0"],
          numOfMilestones: 1,
        },
        "2022-05-29": {
          byId: {
            c_0: {
              t_0: ["m_1"],
              allTaskIds: ["t_0"],
            },
          },
          allCourseIds: ["c_0"],
          numOfMilestones: 1,
        },
        "2022-06-01": {
          byId: {
            c_0: {
              t_1: ["m_2"],
              allTaskIds: ["t_1"],
            },
          },
          allCourseIds: ["c_0"],
          numOfMilestones: 1,
        },
        "2022-06-02": {
          byId: {
            c_0: {
              t_0: ["m_3"],
              allTaskIds: ["t_1"],
            },
          },
          allCourseIds: ["c_0"],
          numOfMilestones: 1,
        },
        "2022-06-05": {
          byId: {
            c_0: {
              t_2: ["m_4"],
              allTaskIds: ["t_2"],
            },
          },
          allCourseIds: ["c_0"],
          numOfMilestones: 1,
        },
        "2022-06-07": {
          byId: {
            c_0: {
              t_0: ["m_5"],
              allTaskIds: ["t_2"],
            },
          },
          allCourseIds: ["c_0"],
          numOfMilestones: 1,
        },
      },
      allCalendarDays: [
        "2022-05-27",
        "2022-05-29",
        "2022-06-01",
        "2022-06-02",
        "2022-06-05",
        "2022-06-07",
      ],
    },
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
      let courseId = `c_${courseIdCounter}`;
      courseIdCounter++;
      state.value.courses.allCourseIds.push(courseId);
      state.value.courses.byId[courseId] = {
        courseName: action.payload.value.toUpperCase(),
        tasks: [],
        totalNumberOfTasks: 0,
        totalNumberOfMilestones: 0,
        totalNumberOfCompletedMilestones: 0,
      };
      courseDataSlice.caseReducers.bruteForceUpdateOnCalendar(state);
    },
    removeCourse: (state, action) => {
      //   console.log(action.payload);
      const { courseId } = action.payload;
      //   const { courseIndex } = action.payload;
      //   let increment = 0;
      const course = state.value.courses.byId[courseId];
      //Loop through tasks
      course.tasks.forEach((e) => {
        // Get all milestones
        const milestones = state.value.tasks.byId[e].milestones;
        // remove each milestone using the ids from milestones
        milestones.forEach((e) => {
          delete state.value.milestones.byId[e];
        });
        //Remove milestones from allMilestonesIds array for the corresponding tasks
        state.value.milestones.allMilestoneIds = withOut(
          state.value.milestones.allMilestoneIds,
          milestones
        );
        //Delete the tasks using their ids
        delete state.value.tasks.byId[e];
      });
      //Remove the tasks from the allTaskIds array
      state.value.tasks.allTaskIds = withOut(
        state.value.tasks.allTaskIds,
        course.tasks
      );
      //Remove the courseId from allCourseIds
      state.value.courses.allCourseIds =
        state.value.courses.allCourseIds.filter((e) => e !== courseId);
      //Delete the course
      delete state.value.courses.byId[courseId];
      courseDataSlice.caseReducers.bruteForceUpdateOnCalendar(state);
    },
    addTasks: (state, action) => {
      const { courseId } = action.payload;
      //modify number of tasks for the course
      const course = state.value.courses.byId[courseId];
      const tasksObj = state.value.tasks;
      course.totalNumberOfTasks += 1;
      //   course.totalNumberOfMilestones += 1;
      let taskId = `t_${taskIdCounter}`;
      course.tasks.push(taskId);
      taskIdCounter++;
      tasksObj.allTaskIds.push(taskId);
      tasksObj.byId[taskId] = {
        taskName: "Task Name (Click me to edit)",
        courseId: courseId,
        numOfMilestones: 0,
        completedMilestones: 0,
        taskStartTime: returnDateStringWithoutMonth(new Date()),
        milestones: [],
      };
      courseDataSlice.caseReducers.addMilestone(state, {
        payload: {
          courseId: courseId,
          taskId: taskId,
        },
      });
      courseDataSlice.caseReducers.bruteForceUpdateOnCalendar(state);
    },
    removeTask: (state, action) => {
      const { courseId, taskId } = action.payload;
      const course = state.value.courses;
      const tasks = state.value.tasks;
      course.byId[courseId].totalNumberOfMilestones -=
        tasks.byId[taskId].numOfMilestones;

      course.byId[courseId].totalNumberOfCompletedMilestones -=
        tasks.byId[taskId].completedMilestones;

      course.byId[courseId].totalNumberOfTasks--;

      course.byId[courseId].tasks = course.byId[courseId].tasks.filter(
        (e) => e !== taskId
      );
      tasks.allTaskIds = tasks.allTaskIds.filter((e) => e !== taskId);
      const milestones = tasks.byId[taskId].milestones;
      milestones.forEach((e) => {
        delete state.value.milestones.byId[e];
      });
      //Remove milestones from allMilestonesIds array for the corresponding tasks
      state.value.milestones.allMilestoneIds = withOut(
        state.value.milestones.allMilestoneIds,
        milestones
      );
      //Delete the tasks using their ids
      delete tasks.byId[taskId];
      courseDataSlice.caseReducers.bruteForceUpdateOnCalendar(state);
    },
    editTaskName: (state, action) => {
      const { taskId, taskName } = action.payload;
      //   console.log(courseIndex, taskIndex, taskName.value);
      state.value.tasks.byId[taskId].taskName = taskName;
      //   state.value.data[courseIndex].tasks[taskIndex].taskName = taskName.value;
      courseDataSlice.caseReducers.bruteForceUpdateOnCalendar(state);
    },
    markMilestone: (state, action) => {
      const { courseId, taskId, milestoneId, milestoneStatus } = action.payload;
      const { isCompleted } = state.value.milestones.byId[milestoneId];
      if (isCompleted) {
        state.value.courses.byId[
          courseId
        ].totalNumberOfCompletedMilestones -= 1;
        state.value.tasks.byId[taskId].completedMilestones -= 1;
      } else {
        state.value.courses.byId[
          courseId
        ].totalNumberOfCompletedMilestones += 1;
        state.value.tasks.byId[taskId].completedMilestones += 1;
      }
      state.value.milestones.byId[milestoneId].isCompleted = milestoneStatus;
      courseDataSlice.caseReducers.bruteForceUpdateOnCalendar(state);
    },
    addMilestone: (state, action) => {
      const { courseId, taskId } = action.payload;
      let milestoneId = `m_${milestoneIdCounter}`;
      milestoneIdCounter++;
      state.value.tasks.byId[taskId].milestones.push(milestoneId);
      state.value.milestones.allMilestoneIds.push(milestoneId);
      state.value.milestones.byId[milestoneId] = {
        courseId: courseId,
        taskId: taskId,
        milestoneName: "Edit me",
        isCompleted: false,
        deadline: returnDateStringWithoutMonth(new Date()),
      };
      state.value.courses.byId[courseId].totalNumberOfMilestones += 1;
      state.value.tasks.byId[taskId].numOfMilestones += 1;
      courseDataSlice.caseReducers.bruteForceUpdateOnCalendar(state);
    },
    removeMilestone: (state, action) => {
      const { courseId, taskId, milestoneId, isCompleted } = action.payload;
      if (state.value.tasks.byId[taskId].milestones.length === 1) {
        return;
      }
      if (isCompleted) {
        state.value.tasks.byId[taskId].completedMilestones -= 1;
        state.value.courses.byId[
          courseId
        ].totalNumberOfCompletedMilestones -= 1;
      }
      state.value.tasks.byId[taskId].numOfMilestones -= 1;
      state.value.courses.byId[courseId].totalNumberOfMilestones -= 1;
      state.value.tasks.byId[taskId].milestones = state.value.tasks.byId[
        taskId
      ].milestones.filter((e) => e !== milestoneId);
      delete state.value.milestones.byId[milestoneId];
      courseDataSlice.caseReducers.bruteForceUpdateOnCalendar(state);
    },
    editMilestone: (state, action) => {
      const { milestoneId, milestoneName } = action.payload;
      state.value.milestones.byId[milestoneId].milestoneName = milestoneName;
      courseDataSlice.caseReducers.bruteForceUpdateOnCalendar(state);
    },
    editCourseName: (state, action) => {
      const { courseId, courseName } = action.payload;
      state.value.courses.byId[courseId].courseName = courseName;
      courseDataSlice.caseReducers.bruteForceUpdateOnCalendar(state);
    },
    editTaskStartTime: (state, action) => {
      const { taskId, newStartDate } = action.payload;
      state.value.tasks.byId[taskId].taskStartTime = newStartDate;
      courseDataSlice.caseReducers.bruteForceUpdateOnCalendar(state);
    },
    editMilestoneEndTime: (state, action) => {
      const { milestoneId, newEndDate } = action.payload;
      state.value.milestones.byId[milestoneId].deadline = newEndDate;
      courseDataSlice.caseReducers.bruteForceUpdateOnCalendar(state);
    },
    bruteForceUpdateOnCalendar: (state, action) => {
      const data = {
        byId: {},
        allCalendarDays: [],
      };
      state.value.milestones.allMilestoneIds.map((e) => {
        if (state.value.milestones.byId[e]) {
          let { courseId, taskId, deadline } = state.value.milestones.byId[e];
          if (data.allCalendarDays.includes(deadline)) {
            if (data.byId[deadline].allCourseIds.includes(courseId)) {
              if (
                data.byId[deadline].byId[courseId].allTaskIds.includes(taskId)
              ) {
                data.byId[deadline].byId[courseId][taskId].push(e);
              } else {
                data.byId[deadline].byId[courseId].allTaskIds.push(taskId);
                data.byId[deadline].byId[courseId][taskId] = [e];
              }
            } else {
              data.byId[deadline].allCourseIds.push(courseId);
              data.byId[deadline].byId[courseId] = {
                [taskId]: [e],
                allTaskIds: [taskId],
              };
            }
          } else {
            data.allCalendarDays.push(deadline);
            data.byId[deadline] = {
              byId: {
                [courseId]: {
                  [taskId]: [e],
                  allTaskIds: [taskId],
                },
              },
              allCourseIds: [courseId],
            };
          }
        }
      });
      // console.log(data);
      state.value.calendar = data;
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
