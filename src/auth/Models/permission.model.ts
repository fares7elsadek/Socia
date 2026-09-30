export enum Permission {
  UsersRead = 'users.read',
  UsersCreate = 'users.create',
  UsersUpdate = 'users.update',
  UsersDelete = 'users.delete',

  PatientsRead = 'patients.read',
  PatientsCreate = 'patients.create',
  PatientsUpdate = 'patients.update',

  AppointmentsRead = 'appointments.read',
  AppointmentsCreate = 'appointments.create',
  AppointmentsCancel = 'appointments.cancel',

  ReportsRead = 'reports.read',
  ReportsExport = 'reports.export',
}