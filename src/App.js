import React from "react";
import "./App.css";
import Login from "./components/Login/index";
import Register from "./components/Register";
import Forget from "./components/ForgetPassword";
import Dashboard from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VideoConference from "./components/VideoConference";
import ContactList from "./components/VideoConference/ContactList";
import VideoDashborad from "./components/VideoConference/Dashborad";
import VideoMettings from "./components/VideoConference/Meetings";
import JoinMeeting from "./components/VideoConference/JoinMeetingPage";
import AdminVideoConference from "./components/Admin/AdminVideo";
import AdminVideoUserDetails from "./components/Admin/AdminVideo/UsersDetails";

import AdminSocialMediaIndex from "./components/Admin/AdminSocialMedia";
import AdminSocialUserDetails from "./components/Admin/AdminSocialMedia/UsersDetails";
import AdminSocialDeUsers from "./components/Admin/AdminSocialMedia/DeactivatedUsers";
import AdminSocialDeUserDetails from "./components/Admin/AdminSocialMedia/DeactivatedUsers/UsersDetails";

import SocialMedia from "./components/eMagz";
import SocialChat from "./components/eMagz/SocialChat";
import SocialVideoChat from "./components/eMagz/VideoCall";
import EmagzProfile from "./components/eMagz/Profile";
import Editprofile from "./components/eMagz/Profile/EditProfile";
import TemplateOne from "./components/eMagz/ProfileTemplates/TemplateOne";
import TemplateTwo from "./components/eMagz/ProfileTemplates/TemplateTwo";
import TemplateThree from "./components/eMagz/ProfileTemplates/TemplateThree";
import ViewProfile from "./components/eMagz/ProfileTemplates/ViewProfile";
import SocialPost from "./components/eMagz/socialPost";
import Notifications from "./components/eMagz/notification";

import ChatNew from "./components/Chat";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import Settings from "./components/Settings";
import Termsconditions from "./components/TermsConditions";
import Privacy from "./components/Privacy";
import Feedback from "./components/Educations/Feedback";
import ApplyLeave from "./components/Educations/ApplyLeave/applyleave";
import LeaveList from "./components/Educations/leaveapplication/leaveApplication";
import Fees from "./components/Educations/Fees";
import UserCarts from "./components/Business/User/UserCarts";
import ProductDetails from "./components/Business/User/UserDashboard/productDetails";
import BusinessUserProfile from "./components/Business/User/UserProfile";
import UserProfileEdit from "./components/Business/User/UserProfileEdit";
import Clothinglist from "./components/Business/Vendor/Products/Clothing/ClothingList";
import ClothingDetails from "./components/Business/Vendor/Products/Clothing/ClothingDetails";
import ProductList from "./components/Business/Vendor/Products/Clothing/ProductList";
import CouponList from "./components/Business/Vendor/Coupons";
import BuainessSubcategories from "./components/Business/User/UserDashboard/Subcategories";
import Business from "./components/Business";
import ApproveForm from "./components/Business/Vendor/ApprovalForm";
import PaymentDetails from "./components/Business/Vendor/Payments";
import { Payment, Sports } from "@material-ui/icons";
import Receipt from "./components/Business/Vendor/Receipt";
import BusinessChat from "./components/Business/BusinessChat";
import VendorDashboard from "./components/Business/Vendor/VendorDashboard";
import Clothings from "./components/Business/Vendor/Products/Clothing";
import Books from "./components/Business/Vendor/Products/Books";
import Appliances from "./components/Business/Vendor/Products/TV&Appliances";
import HomeFurniture from "./components/Business/Vendor/Products/Home&Furniture";
import Grocery from "./components/Business/Vendor/Products/Grocery";
import Electronics from "./components/Business/Vendor/Products/Electronics";
import Orders from "./components/Business/Vendor/Orders";
import OrderDetails from "./components/Business/Vendor/Orders/OrderDetails";
import UserDashboard from "./components/Business/User/UserDashboard";
import TeacherLeave from "./components/Educations/TeacherLeave";
import MyOrders from "./components/Business/User/MyOrders";
import OrderSupport from "./components/Business/User/MyOrders/OrderSupport";
import OrderProcess from "./components/Business/User/OrderProcess";
import Support from "./components/Business/User/Support";
import ManageAddress from "./components/Business/User/ManageAddress";
import AddNewAddress from "./components/Business/User/ManageAddress/AddNewAddress"
import Wishlist from "./components/Business/User/WishList";
import Coupon from "./components/Business/User/Coupon";
import Review from "./components/Business/User/Reviews";

import ProfileInformation from "./components/Business/User/PersonalInformation";
import BusinessUserChat from "./components/Business/BusinessChat";
import BusinessTemplagte from "./components/Business/businessTemplate";
import VendorsDashborad from "./components/Business/Vendor/VendorsDashborad";
import MyDocument from "./components/Business/Vendor/Receipt";
import EditApprovalForm from "./components/Business/Vendor/ApprovalForm/Edit_ApprovalForm";
import PaymentGatway from "./components/Business/User/DeliveryAddress";

import StudentFees from "./components/Educations/Fees/StudentFees";
import Educations from "./components/Educations";
import Remarks from "./components/Educations/Remarks";
import ShortTest from "./components/Educations/Test/shorttest";

import AdminBusinessChat from "./components/Admin/AdminBusinessChat";
import VendorList from "./components/Admin/AdminBusiness/Admin";
import UserList from "./components/Admin/AllBusinessUser";
import BusinessAdminDashborad from "./components/Admin/BusinessDashborad";
import AdminDashborad from "./components/Admin/AdminDashborad";
import AdminProfile from "./components/Admin/AdminDashborad/Profile";

import AdminEducation from "./components/Admin/AdminEducation";
import GetPrincipals from "./components/Admin/AdminEducation/GetPrincipal";

import AdminEducationDashBorad from "./components/Admin/AdminEducation/EducationDashborad";
import AdminSchoolDetal from "./components/Admin/AdminEducation/SchoolDetails";
import AdminDeactivatedSchools from "./components/Admin/AdminEducation/DeactivatedSchools";
import AdminDeactivatedDetails from "./components/Admin/AdminEducation/DeactivatedSchools/SchoolDetails";
import AddNewSchool from "./components/Admin/AdminEducation/AddNewSchool";
import StudentInfo from "./components/Admin/AdminEducation/StudentInfo";
import TeacherInfo from "./components/Admin/AdminEducation/TeachersInfo";
import UpdateSchool from "./components/Admin/AdminEducation/EditSchool";

// Student
import GivenTestStudentList from "./components/Educations/Test/ViewStudents";
import StudentRemark from "./components/Educations/Student/StudentRemarks";
import EduStudentChat from "./components/Educations/StudentChat";
import EduTeacherChat from "./components/Educations/EduTeacherChat";
import TestDetails from "./components/Educations/Test/testdetails/testdetails";
import VideoCall from "./components/Educations/VideoCall/Home";
import EducationContact from "./components/Educations/VideoCall/ContactList";
import EducationMeeting from "./components/Educations/VideoCall/Meetings";
import TeacherProfile from "./components/Educations/MyProfile/TeacherProfile";
import StudentProfile from "./components/Educations/MyProfile/StudentProfile";
import PrincipalProfile from "./components/Educations/MyProfile/PrincipalProfile";
import StudentDetails from "./components/Educations/Student/Addstudent";
import TeacherDetails from "./components/Educations/Teacher/AddTeacher";
import Attendance from "./components/Educations/Attendance";
import StudentAttendance from "./components/Educations/Attendance/StudentAttendance";
import CreateTest from "./components/Educations/Test/CreateTest";
import SchoolDetails from "./components/Educations/School/ListSchool";
import TeacherList from "./components/Educations/Teacher/TeacherList";
import EditTeacher from "./components/Educations/Teacher/EditTeacher";
import AddstudentDiary from "./components/Educations/Class Diary/TeacherDiary";
import StudentDiaryList from "./components/Educations/Class Diary/StudentDiary/ViewStudentDiary";
import ViewTeacherList from "./components/Educations/Class Diary/TeacherDiary/ViewTeacherDiary";
import ViewStudentDiary from "./components/Educations/Class Diary/StudentDiary/ViewStudentDiary";
import ViewStudentList from "./components/Educations/Class Diary/StudentDiary/ViewStudentDiaryList";
import ViewStudentNoticeBoard from "./components/Educations/Noticeboard/StudentNoticeboard";
import TeacherDiary from "./components/Educations/Class Diary/TeacherDiary";
import TeacherNoticeboard from "./components/Educations/Noticeboard/TeacherNoticeBoard";
import TestTeacher from "./components/Educations/Test/TestTeacher";
import ListsQuestion from "./components/Educations/Test/ListsQuestion";
import CreateQuestion from "./components/Educations/Test/CreateQuestion";
import Timetable from "./components/Educations/TimeTable";
import AcademicReport from "./components/Educations/AcademicReport/AddAcademic";
import StudentcontactUs from "./components/Educations/ContactUs/StudentContactus";
import BusTracking from "./components/Educations/BusTracking";
import TeacherFeedback from "./components/Educations/Feedback/TeacherFeedback";
import TeacherContactus from "./components/Educations/ContactUs/TeacherContactus";
import StudentContactus from "./components/Educations/ContactUs/StudentContactus";
import StudentNoticboard from "./components/Educations/Noticeboard/StudentNoticeboard";
import TeacherHomeworks from "./components/Educations/HomeWork/TeacherHomework";
import ViewHomework from "./components/Educations/HomeWork/TeacherHomework/ViewHomeWork";
import StudentHomeWork from "./components/Educations/HomeWork/StudentHomwork";
import TeacherAttendance from "./components/Educations/Attendance";
import TeacherTimetable from "./components/Educations/TimeTable/TeacherTimetable";
import ViewTeacherTimeTable from "./components/Educations/TimeTable/TeacherTimetable/ViewTimetable";
import MainLandingpage from "./components/Educations/Mainpage";
import StudentRegisterForm from "./components/Educations/Mainpage/StudentRegisterForm";
import DepositFees from "./components/Educations/Principal/Depositfees";
import AddFees from "./components/Educations/Principal/Addfees";

// Principal

import EduPrincipalChat from "./components/Educations/EduPrinciplChat";
import Declaration from "./components/Educations/Declaration";
import Addclass from "./components/Educations/Principal/SchoolSettings/Addclass";
import Addsection from "./components/Educations/Principal/SchoolSettings/Addsection";
import Addsubject from "./components/Educations/Principal/SchoolSettings/Addsubject";
import SchoolMainPage from "./components/Educations/Principal/MainSchoolPage";
import SchoolMainPageProfile from "./components/Educations/Principal/MainSchoolPage/SchoolProfile";
import StudentAcademicReport from "./components/Educations/AcademicReport/StudentAcademicreport";
import TeacherAcademicReport from "./components/Educations/AcademicReport/TeacherAcademicReport";
import TeacherAcademicView from "./components/Educations/AcademicReport/ViewAcademic";
import ViewStudentTimetable from "./components/Educations/TimeTable/TeacherTimetable/ViewStudenttimetable";
import MytimeTable from "./components/Educations/TimeTable/TeacherTimetable/Mytimetable";
import MyAttendance from "./components/Educations/Attendance/ViewMyattendance";
import ViewStudentAttendance from "./components/Educations/Attendance/ViewStudentAttendance";
import PrincipalAttendance from "./components/Educations/Principal/AttendancePrincipal";
import ViewTeacherAttendance from "./components/Educations/Principal/AttendancePrincipal/ViewAllTeacherAttendance";
import PrincipalTimetable from "./components/Educations/Principal/TimetablePrincipal";
import ViewTeacherTimetable from "./components/Educations/Principal/TimetablePrincipal/ViewTeacherTimetable";
import VerifyOtp from "./components/Otp";
import Home from "./components/Landing";
//add by priyanka
import Welcome from "./components/Educations/welcome";
import WelcomeDashboard from './components/VideoConference/welcome';
import VideoCallConference from './components/VideoConference/welcome/videoCall/VideoCallConference'
import JoinMeetingScreen from "./components/VideoConference/welcome/videoCall/JoinMeetingScreen";
import WaitingScreen from "./components/VideoConference/welcome/videoCall/WaitingScreen";
//buinessDashboard
import Vendor from './components/Business/Vendor';
import ReviewComponent from "./components/Business/User/Reviews/ReviewComponent";
const App = () => {
  const data = localStorage.getItem("education");
  const user = localStorage.getItem('user')
  console.log("user", user)
  const maindata = JSON.parse(data);
  return (
    <>
      <Router>
        <Switch>

          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forget-password" component={Forget} />
          <Route exact path="/verify-otp" component={VerifyOtp} />
          {/* video Conference dashborder Priyanka */}

          <Route exact
            path='/video-conference/WelcomeDashboard'
            component={WelcomeDashboard}
          />

          <Route exact
            path='/video-conference/videoCall/VideoCallConference/:meeting_id'
            component={VideoCallConference}
          />

          <Route exact
            path='/video-conference/videoCall/JoinMeeting'
            component={JoinMeetingScreen}
          />
          <Route exact
            path='/video-conference/videoCall/Waiting'
            component={WaitingScreen}
          />
          {/* end by priyanka */}
          {/* Video Conference */}
          <Route
            exact
            path="/video-conference/dashborad/connect"
            component={VideoConference}
          />
          <Route
            exact
            path="/video-conference/dashborad"
            component={VideoDashborad}
          />
          <Route
            exact
            path="/video-conference/dashborad/home"
            component={Home}
          />
          <Route
            exact
            path="/video-conference/dashborad/contactlist"
            component={ContactList}
          />
          <Route
            exact
            path="/video-conference/dashborad/meetings"
            component={VideoMettings}
          />
          <Route
            exact
            path="/video-conference/joinmeeting/:id"
            component={JoinMeeting}
          />
          <Route
            exact
            path="/admin/video-conference/users"
            component={AdminVideoConference}
          />
          <Route
            exact
            path="/admin/video-conference/users/:id"
            component={AdminVideoUserDetails}
          />
          {/* Social Media */}
          <Route
            exact
            path="/admin/emagz/acvtive-users"
            component={AdminSocialMediaIndex}
          />
          <Route
            exact
            path="/admin/emagz/acvtive-users/:id"
            component={AdminSocialUserDetails}
          />
          <Route
            exact
            path="/admin/emagz/deacvtive-users"
            component={AdminSocialDeUsers}
          />
          <Route
            exact
            path="/admin/emagz/deacvtive-users/:id"
            component={AdminSocialDeUserDetails}
          />
          <Route exact path="/eMagz" component={SocialMedia} />
          <Route exact path="/eMagz/chat" component={SocialChat} />
          <Route
            exact
            path="/eMagz/chat/video-calling"
            component={SocialVideoChat}
          />
          <Route exact path="/eMagz/profile" component={TemplateThree} />
          <Route exact path="/eMagz/user-profile" component={ViewProfile} />
          <Route exact path="/eMagz/posts/:id" component={SocialPost} />
          <Route exact path="/eMagz/edit-profile" component={Editprofile} />
          <Route exact path="/eMagz/notifications" component={Notifications} />
          {/*education priynak home  */}
          <Route exact
            path='/educations/welcome'
            component={Welcome}
          />
          {/* Educations */}
          <Route
            exact
            path="/educations/admission"
            component={MainLandingpage}
          />
          <Route
            exact
            path="/educations/admission/register"
            component={StudentRegisterForm}
          />
          <Route
            exact
            path="/educations/home-page"
            component={SchoolMainPage}
          />
          <Route
            exact
            path="/educations/home-page/profile"
            component={SchoolMainPageProfile}
          />
          <Route exact path="/educations" component={Educations} />
          <Route
            exact
            path="/educations/my-profile/metting/home"
            component={VideoCall}
          />
          <Route
            exact
            path="/educations/my-profile/metting/mettings"
            component={EducationMeeting}
          />
          <Route
            exact
            path="/educations/my-profile/metting/contacts"
            component={EducationContact}
          />
          {/* Student */}

          <Route
            exact
            path="/educations/student/chat"
            component={EduStudentChat}
          />
          <Route
            exact
            path="/educations/student/remarks"
            component={StudentRemark}
          />
          <Route
            exact
            path="/educations/notice-board"
            component={StudentNoticboard}
          />
          <Route exact path="/educations/homework" component={EditTeacher} />
          <Route
            exact
            path="/educations/home-works"
            component={StudentHomeWork}
          />
          <Route
            exact
            path="/educations/class-diary"
            component={ViewStudentList}
          />
          <Route exact path="/educations/remarks" component={Remarks} />
          <Route
            exact
            path="/educations/class-diary/student-details"
            component={ViewStudentDiary}
          />
          <Route
            exact
            path="/educations/attendance"
            component={StudentAttendance}
          />
          <Route
            exact
            path="/educations/apply-a-leave"
            component={ApplyLeave}
          />
          <Route
            exact
            path="/educations/apply-a-leave/view-all"
            component={LeaveList}
          />
          <Route exact path="/educations/timetable" component={Timetable} />
          <Route
            exact
            path="/educations/academic-reports"
            component={StudentAcademicReport}
          />
          <Route exact path="/educations/fees" component={StudentFees} />
          <Route
            exact
            path="/educations/test-details"
            component={TestDetails}
          />
          <Route exact path="/educations/take-a-test" component={TestDetails} />
          <Route
            exact
            path="/educations/take-a-test/online-test"
            component={ShortTest}
          />
          <Route exact path="/educations/bus-tracking" />
          <Route exact path="/educations/feedback" component={Feedback} />
          <Route
            exact
            path="/educations/contact-us"
            component={StudentcontactUs}
          />
          <Route
            exact
            path="/educations/bus-tracking"
            component={BusTracking}
          />
          <Route
            exact
            path="/educations/teacher/test-list/viewstudentlist"
            component={GivenTestStudentList}
          />
          <Route
            exact
            path="/educations/contact-us"
            component={StudentContactus}
          />
          {/* Teacher */}
          <Route
            exact
            path="/educations/teachers/chat"
            component={EduTeacherChat}
          />
          <Route
            exact
            path="/educations/teacher/profile"
            component={TeacherProfile}
          />
          <Route
            exact
            path="/educations/student/profile"
            component={StudentProfile}
          />
          <Route
            exact
            path="/educations/principal/profile"
            component={PrincipalProfile}
          />
          <Route
            exact
            path="/educations/teacher/noticeboard"
            component={TeacherNoticeboard}
          />
          <Route
            exact
            path="/educations/teacher/home-works"
            component={TeacherHomeworks}
          />
          <Route
            exact
            path="/educations/teacher/home-works/view-all"
            component={ViewHomework}
          />
          <Route
            exact
            path="/educations/teacher/noticeboard"
            component={TeacherNoticeboard}
          />
          <Route
            exact
            path="/educations/teacher/class-diary"
            component={ViewTeacherList}
          />
          <Route
            exact
            path="/educations/class-diary/student-details"
            component={ViewStudentDiary}
          />
          <Route
            exact
            path="/educations/teacher/attendance"
            component={TeacherAttendance}
          />
          <Route
            exact
            path="/educations/teacher/attendance/view-all"
            component={MyAttendance}
          />
          <Route
            exact
            path="/educations/teacher/attendance/view-all-student"
            component={ViewStudentAttendance}
          />
          <Route
            exact
            path="/educations/teacher/apply-a-leave"
            component={TeacherLeave}
          />
          <Route
            exact
            path="/educations/apply-a-leave/view-all"
            component={LeaveList}
          />
          <Route
            exact
            path="/educations/teacher/timetable"
            component={TeacherTimetable}
          />
          <Route
            exact
            path="/educations/teacher/timetable/view-all-student"
            component={ViewStudentTimetable}
          />
          <Route
            exact
            path="/educations/teacher/timetable/view-all"
            component={MytimeTable}
          />
          <Route
            exact
            path="/educations/teacher/timetable/view-all"
            component={ViewTeacherTimeTable}
          />
          <Route
            exact
            path="/educations/teacher/academic-reports"
            component={TeacherAcademicReport}
          />
          <Route
            exact
            path="/educations/teacher/academic-reports/view"
            component={TeacherAcademicView}
          />
          <Route exact path="/educations/fees" component={Fees} />
          <Route
            exact
            path="/educations/teacher/add-test"
            component={CreateTest}
          />
          <Route
            exact
            path="/educations/teacher/test-list"
            component={TestTeacher}
          />
          <Route
            exact
            path="/educations/teacher/list-question"
            component={ListsQuestion}
          />
          <Route
            exact
            path="/educations/teacher/add-question"
            component={CreateQuestion}
          />
          {/* <Route exact path='/educations/take-a-test' component={TakeATest} /> */}
          <Route exact path="/educations/bus-tracking" />
          <Route
            exact
            path="/educations/teacher/feedback"
            component={TeacherFeedback}
          />
          <Route
            exact
            path="/educations/teacher/contact-us"
            component={TeacherContactus}
          />
          {/* Principal */}
          <Route
            exact
            path="/educations/principal/chat"
            component={EduPrincipalChat}
          />
          <Route exact path="/educations/declaration" component={Declaration} />
          <Route
            exact
            path="/educations/principal/school-settings/add-class"
            component={Addclass}
          />
          <Route
            exact
            path="/educations/principal/school-settings/add-section"
            component={Addsection}
          />
          <Route
            exact
            path="/educations/principal/school-settings/add-subject"
            component={Addsubject}
          />
          <Route
            exact
            path="/educations/principal/home-page"
            component={SchoolMainPage}
          />
          <Route
            exact
            path="/educations/principal/deposit-fees"
            component={DepositFees}
          />
          <Route
            exact
            path="/educations/principal/add-fees"
            component={AddFees}
          />
          <Route
            exact
            path="/education/principal/attendance"
            component={PrincipalAttendance}
          />
          <Route
            exact
            path="/educations/principal/attendance/view-all-teachers"
            component={ViewTeacherAttendance}
          />
          <Route
            exact
            path="/educations/principal/timetable"
            component={PrincipalTimetable}
          />
          <Route
            exact
            path="/educations/principal/timetable/view-all-teachers"
            component={ViewTeacherTimetable}
          />

          {/* ADMIN */}
          {/* ADMIN DASHBORAD */}
          <Route exact path="/admin/dashboard" component={AdminDashborad} />
          <Route
            exact
            path="/admin/dashboard/profile"
            component={AdminProfile}
          />

          <Route
            exact
            path="/admin/business/vendor-list"
            component={VendorList}
          />
          <Route exact path="/admin/business/user-list" component={UserList} />
          <Route
            exact
            path="/admin/bussiness/dashboard"
            component={BusinessAdminDashborad}
          />
          <Route
            exact
            path="/admin/business/support"
            component={AdminBusinessChat}
          />

          <Route
            exact
            path="/admin/education/schools"
            component={AdminEducation}
          />
          <Route
            exact
            path="/admin/education/principals"
            component={GetPrincipals}
          />
          <Route
            exact
            path="/admin/education/deactivated-schools"
            component={AdminDeactivatedSchools}
          />
          <Route
            exact
            path="/admin/education/deactivated-schools/details"
            component={AdminDeactivatedDetails}
          />
          <Route
            exact
            path="/admin/education/dashboard"
            component={AdminEducationDashBorad}
          />
          <Route
            exact
            path="/admin/education/new-school"
            component={AddNewSchool}
          />
          <Route
            exact
            path="/admin/education/schools/:id/teachers"
            component={TeacherInfo}
          />
          <Route
            exact
            path="/admin/education/schools/:id/update"
            component={UpdateSchool}
          />
          <Route
            exact
            path="/admin/education/schools/:id/students"
            component={StudentInfo}
          />
          <Route
            exact
            path="/admin/education/schools/:id"
            component={AdminSchoolDetal}
          />

          {/* Business */}
          <Route exact path="/business" component={Business} />
          <Route exact path="/business/chat" component={BusinessChat} />
          <Route exact path="/business/approve-form" component={ApproveForm} />
          <Route
            exact
            path="/business/edit-approve-form"
            component={EditApprovalForm}
          />
          {/* Business User */}
          <Route
            exact
            path="/business/user-dashboard"
            component={UserDashboard}
          />
          <Route
            exact
            path="/business/user-dashboard/subcategories"
            component={BuainessSubcategories}
          />
          <Route
            exact
            path="/business/user-dashboard/carts"
            component={UserCarts}
          />
          <Route
            exact
            path="/business/payment-summery"
            component={PaymentGatway}
          />
          <Route
            exact
            path="/business/user-dashboard/profile"
            component={BusinessUserProfile}
          />
          <Route
            exact
            path="/business/user-dashboard/profile/address"
            component={ManageAddress}
          />
          <Route
            exact
            path="/business/user-dashboard/profile/address/add"
            component={AddNewAddress}
          />
          <Route
            exact
            path="/business/user-dashboard/profile/wishlist"
            component={Wishlist}
          />
          <Route exact path="/business/profile/coupons" component={Coupon} />
          <Route exact path="/business/user-dashboard/profile/coupon" component={Coupon} />

          <Route exact path="/business/user-dashboard/profile/review" component={Review} />


          <Route
            exact
            path="/business/user-dashboard/profile/orders"
            component={MyOrders}
          />
          <Route
            exact
            path="/business/user-dashboard/profile/order/support"
            component={OrderSupport}
          />

          <Route
            exact
            path="/business/user-dashboard/profile/process"
            component={OrderProcess}
          />
          {/* <Route
            exact
            path="/business/profile/my-orders/my-order-details"
            component={MyOrderDetails}
          /> */}
          <Route
            exact
            path="/business/edit-profile"
            component={UserProfileEdit}
          />
          <Route
            exact
            path="/business/payments-view"
            component={PaymentDetails}
          />

          <Route
            exact
            path="/business/user-dashboard/:name"
            component={ProductDetails}
          />
          <Route exact path="/business/orders" component={Orders} />
          <Route
            exact
            path="/business/profile/my-orders/support"
            component={Support}
          />
          <Route exact path="/business/products" component={VendorDashboard} />
          {/* Business */}
          <Route
            exact
            path="/bussiness/dashboard/"
            component={VendorsDashborad}
          />
          <Route
            exact
            path="/business/vendor-dashboard/product-list"
            component={Clothinglist}
          />
          <Route
            exact
            path="/business/vendor-dashboard/product-list/product-details-list"
            component={ProductList}
          />
          <Route
            exact
            path="/business/vendor-dashboard/coupons"
            component={CouponList}
          />
          <Route
            exact
            path="/business/vendor-dashboard/product-list/add-product"
            component={Clothings}
          />
          <Route
            exact
            path="/business/vendor-dashboard/product-list/add-details"
            component={ClothingDetails}
          />
          <Route
            exact
            path="/business/payments-view"
            component={PaymentDetails}
          />
          <Route
            exact
            path="/business/vendor-dashboard/orders"
            component={Orders}
          />
          <Route
            exact
            path="/business/orders-list/order-details"
            component={OrderDetails}
          />
          <Route
            exact
            path="/business/vendor-dashboard"
            component={VendorDashboard}
          />
          <Route
            exact
            path="/business/products/clothing"
            component={Clothings}
          />
          <Route exact path="/business/products/books" component={Books} />
          <Route
            exact
            path="/business/products/tv-appliances"
            component={Appliances}
          />
          <Route
            exact
            path="/business/products/home-appliances"
            component={HomeFurniture}
          />
          <Route exact path="/business/products/sports" component={Sports} />
          <Route exact path="/business/products/grocery" component={Grocery} />
          <Route
            exact
            path="/business/products/electronics"
            component={Electronics}
          />
          <Route
            exact
            path="/business/orders-list/order-details/print"
            component={MyDocument}
          />
          <Route
            exact
            path="/business/:name/:id"
            component={BusinessTemplagte}
          />

          {/* Dashboard */}
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/profile" component={Profile} />
          <Route exact path="/change-password" component={ChangePassword} />
          <Route exact path="/dashboard/settings" component={Settings} />
          <Route
            exact
            path="/dashboard/term-conditions"
            component={Termsconditions}
          />
          <Route exact path="/dashboard/privacy-policy" component={Privacy} />

          {/* <Route exact path="/dashboard/chat" component={Chat} />  */}
          {/* priyanka vendor */}
          <Route exact path={'/Business/Vendor'} component={Vendor} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
