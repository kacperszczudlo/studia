<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
  <title>Roster List</title>
</head>
<body>
<h1>Roster List</h1>
<ul>
  <c:forEach var="member" items="${memberList}" varStatus="status">
    <li>
      <a href="member?id=${status.index}">${member}</a>
    </li>
  </c:forEach>
</ul>
</body>
</html>
