import java.util.*;
import java.io.*;

class GetPost{


  public static void main(String[] args){
    System.out.println( "Content-Type: text/html\n");
    System.out.println( "<html>\n<head>\n<title>Get And Post Forms</title></head>");
    System.out.println( "<style>" );
    System.out.println( "</style>" );
    System.out.println( "<body>");
    System.out.println( "<h1>Get Form </h1>" );
    System.out.println( "<form action='processdata.cgi' method='get'>");
    System.out.println( "<input type='text' name='username' placeholder='Username'>" );
    System.out.println( "<input type='password' name='password' placeholder='Password'>" );
    System.out.println( "<input type='number' name='magicnumber' placeholder='Magic Number'>" );
    System.out.println( "<input type='submit' value='Submit'>" );
    System.out.println( "</form>" );
    System.out.println( "<h1>Post Form </h1>" );
    System.out.println( "<form action='processdata.cgi' method='post'>");
    System.out.println( "<input type='text' name='username' placeholder='Username'>" );
    System.out.println( "<input type='password' name='password' placeholder='Password'>" );
    System.out.println( "<input type='number' name='magicnumber' placeholder='Magic Number'>" );
    System.out.println( "<input type='submit' value='Submit'>" );
    System.out.println( "</body>\n</html>" );

  }
}
