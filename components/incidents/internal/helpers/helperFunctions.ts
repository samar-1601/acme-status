//function to calculate percentage of progress bar to be filled from status
export function calculateStatus(status: String): number {
    if (status == "Investigating") {
      return 0;
    }
    if (status == "Identified") {
      return 33;
    }
    if (status == "Monitoring") {
      return 66;
    } else {
      return 100;
    }
  }
  
//function to get color code of progress bar
export function getStatusBarColor(status: String): string {
    if (status == "Investigating") {
      return "red";
    }
    if (status == "Identified") {
      return "#FFD04F";
    }
    if (status == "Monitoring") {
      return "#F08C1A";
    } else {
      return "#33CC99";
    }
  }


//function to get status from percentage of bar where click has been made
export function getStatusFromPercentage(percentage: number):string{
    if (percentage < 16) {
        return "Investigating";
      } else if (percentage < 50) {
        return "Identified";
      } else if (percentage < 83) {
       return "Monitoring";
      } else {
        return "Resolved";
      }
  }
