import java.util.*;

class EnvMap{
	public static void main(String[] args) {

		Map<String, String> env = System.getenv();
		ArrayList <String> browser = new ArrayList <String>();
		ArrayList <String>  server  = new ArrayList <String>();
		for(String envName : env.keySet()){

			if(envName.startsWith("HTTP")){
				browser.add(envName);
			}
			else{
				server.add(envName);
			}
		}
		System.out.println("Content-Type: text/html\n");
		System.out.println("<html><head><title>Environment Variables Java</title>");
		System.out.println("<style> table { border-collapse: collpase} td{border: 1px solid black} th, td{padding:12px} .header{ font-weight: bold; font-size: 120%;} </style>");;

		System.out.println("</head> <body>");
		System.out.println("<h1>Enviroment Variables</h1> <h2>Browser Variables </h2>");
		System.out.println("<table>");
		System.out.println("<tr><td class = 'header'>Variable Name</td><td class ='header'>Value</td></tr>");

		Collections.sort(browser);
		Collections.sort(server);

		for(String browserName : browser){
			String row = String.format("<tr><td> %s </td><td> %s </td></tr>",browserName, env.get(browserName));
			System.out.println(row);
		}
		System.out.println("</table>");

		System.out.println("<h2>Server Variables </h2>");
		System.out.println("<table>");
		System.out.println("<tr><td class = 'header'>Variable Name</td><td class ='header'>Value</td></tr>");

		for(String serverName : server){
			String serverRow = String.format("<tr><td> %s </td><td> %s </td></tr>",serverName, env.get(serverName));
			System.out.println(serverRow);
		}
		System.out.println("</table>");
		System.out.println("</body>");
}
}
