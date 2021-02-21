const API = {
  WEDEMY_HOST_DOMAIN: 'http://54.254.13.200:8080/wedemy',

  /* 1. API of Tutor & Participant */

  // 1.A. Class
  WEDEMY_CLASS_QUERY_PATH: '/module-registration/module-and-materials',
  WEDEMY_CLASS_ENROLLMENT_TUTOR_QUERY_PATH: '/detail-class/tutor',
  WEDEMY_CLASS_ENROLLMENT_PARTICIPANT_QUERY_PATH: '/class-enrollment/participant',
  WEDEMY_CLASS_DETAIL: '/detail-class',

  // 1.B. Forum
  WEDEMY_FORUM_QUERY_PATH: '/forum',
  WEDEMY_FORUM_MATERIAL_QUERY_PATH: '/forum/material',
  WEDEMY_FORUM_REPLY_QUERY_PATH: '/detail-forum',

  // 1.C. Material
  WEDEMY_MATERIAL_QUERY_PATH: '/learning-material',
  WEDEMY_DETAIL_MODULE_QUERY_PATH: '/detail-module-rgs',
  WEDEMY_MATERIAL_TYPE_QUERY_PATH: '/learning-material-type',

  // 1.D Presence
  WEDEMY_PRESENCE_QUERY_PATH: '/presence',
  WEDEMY_PARTICIPANT_PRESENCE_QUERY_PATH: '/approvement-renewal/participants-presence',
  WEDEMY_APPROVEMENT_PARTICIPANT_PRESENCE_QUERY_PATH: '/approvement-renewal/tutor-approvement',
  WEDEMY_DETAIL_PRESENCE_QUERY_PATH: '/detail-module-rgs/module-and-material',
  WEDEMY_REPORT_DETAIL_PRESENCE_QUERY_PATH: '/approvement-renewal/report/detail',
  WEDEMY_REPORT_PRESENCE_QUERY_PATH: '/approvement-renewal/report',

  // 1.E Assignment
  WEDEMY_ASSIGNMENT_QUERY_PATH: '/evaluation',
  WEDEMY_ASSIGNMENT_SCORE_QUERY_PATH: '/evaluation/submission-score',

  // 1.F Answer
  WEDEMY_ANSWER_QUERY_PATH: '/assignment-submission/participant',
  WEDEMY_ANSWER_UPLOAD_QUERY_PATH: '/assignment-submission',

  // 1.G Evaluation
  WEDEMY_SCORE_QUERY_PATH: '/evaluation/report',
  WEDEMY_DETAIL_SCORE_QUERY_PATH: '/evaluation/report/participant',
  WEDEMY_CERTIFICATE_QUERY_PATH: '/evaluation/certificate'
}

export default API;