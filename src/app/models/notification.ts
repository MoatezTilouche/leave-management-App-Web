export interface  AdminNotification{
    _id: string;
    nameNotif: string;
    dateNotif: Date;
    contenuNotif: string;
   
    employe: string; // Add this field if not present
  employePhoto?: string; 
  }