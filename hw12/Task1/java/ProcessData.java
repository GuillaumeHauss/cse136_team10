import java.util.*;
import java.io.*;

class ProcessData{

  static void toHTML(String content){
    String html = String.format("<!doctype html><html><body><head><title>Process Data Java</title></head>%s</body></html>",content);
    System.out.print("Content-Type: text/html\n\n");
    System.out.println(html);
  }

  public static void main(String[] args){

    Map<String, String> formData = new HashMap <String, String>();
    Map<String, String> env = System.getenv();
    String data = "";
    String htmlContent = "";

    if(env.get("REQUEST_METHOD").toString().equals("GET")){
       data = env.get("QUERY_STRING");
    }
    else if(env.get("REQUEST_METHOD").toString().equals("POST")){
    
      DataInput postOutput = new DataInputStream(System.in);
      String outputLine;
      try{
      while((outputLine = postOutput.readLine()) != null){
        data = data + outputLine;
      }
    }catch(IOException i){
      toHTML("<h1> Sorry, there was an error parsing post data </h1>");
    }
    }
    else{
      toHTML("<h1>There was no GET or POST request submitted through a form!</h1>");
      return;
    }

    String[] formField = data.split("&");

    for(int i = 0; i < formField.length; i++){
      String[] fields = formField[i].split("=");
      formData.put(fields[0],fields[1]);
    }
    int magicNum;
    try{
      magicNum = Integer.parseInt(formData.get("magicnumber"));
    }catch(NumberFormatException e){
      toHTML("<h1> Sorry, There was an error parsing the magic number </h1>");
      return;
    }

    for(int i = 0; i < magicNum; i++){
      htmlContent = htmlContent + ("<h1> Hello " + formData.get("username") + " with a password of " + formData.get("password") + " </h1>");
    }
    toHTML(htmlContent);

  }
}
