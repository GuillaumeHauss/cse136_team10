import java.text.SimpleDateFormat;
import java.util.*;

class HelloWorld {
  public static void main(String[] args) {

    //Initialize Date and colors
    //String timeStamp = (new java.util.Date()).toLocaleString();
    SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
    Date today = new Date();
    TimeZone pst = TimeZone.getTimeZone("America/Los_Angeles");
    dateFormat.setTimeZone(pst);
    String timeStamp = dateFormat.format(today);
    String[] colors  = {"aqua", "black", "blue", "fuchsia", "gray", "green", "lime",
        "maroon", "navy", "olive","purple", "red", "silver", "teal", "white", "yellow"};
    String textColor = "black";

    //Grab random number from 0 -15
    Random rand = new Random();
    int randomNum = rand.nextInt(16);

    String backgroundColor  = colors[randomNum];

    if(backgroundColor == "black" || backgroundColor == "navy" || backgroundColor == "blue") textColor = "white";
    String document = String.format("<!doctype html> \n"
      + "<body style = 'background-color: %s'>"
      + "<h1 style = 'color:%s'> Hello World from Java @ %s </h1>"
      + "</body> "
      +"</html>", backgroundColor , textColor ,  timeStamp);

    System.out.print("Content-Type: text/html\n\n");
    System.out.print(document);
  }
}
