<?php

echo "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>
<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\">
  <head>
    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=ISO-8859-1\"/>
    <title>Super-Simple DHTML Tree</title>
    
    <style type=\"text/css\">
      body {
        font-size: 12px;
        font-family: verdana;
        background-color: white;
      }
      
      .root {
      padding: 0px 0px 2px 0px
      }
      
      .root div {
      padding: 0px 0px 0px 0px;
      display: none;
      margin-left: 3em;
      }
    </style>
    
    <script type=\"text/javascript\" language=\"JavaScript\">	
    
      function toggleNode(node) 
      {
        var nodeArray = node.childNodes;
        for(i=0; i < nodeArray.length; i++)
        {
          node = nodeArray[i];
          if (node.tagName && node.tagName.toLowerCase() == 'div')
            node.style.display = (node.style.display == 'block') ? 'none' : 'block';
        }
      }
      
      function openNode(node)
      {
        var nodeArray = node.childNodes;
        for(i=0; i < nodeArray.length; i++)
        {
          node = nodeArray[i];
          if (node.tagName && node.tagName.toLowerCase() == 'div')
            node.style.display = 'block';
        }
      }

      function closeNode(node)
      {
        var nodeArray = node.childNodes;
        for(i=0; i < nodeArray.length; i++)
        {
          node = nodeArray[i];
          if (node.tagName && node.tagName.toLowerCase() == 'div')
            node.style.display = 'none';
        }
      }

      function showNode(node)
      {
        if (!node) return;
        if (!node.parentNode) return;
        node = node.parentNode;
        while (node.tagName.toLowerCase() == 'div')
        {
          openNode(node);
          node = node.parentNode;
        }
      }
    </script>
  </head>

<body>";
?>
