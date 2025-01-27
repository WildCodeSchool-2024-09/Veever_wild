SELECT 
  'restaurant' AS category,
  JSON_ARRAYAGG(JSON_OBJECT('id', r.id, 'name', r.name)) AS items
FROM (
  SELECT DISTINCT r.id, chr.name
  FROM chr
  INNER JOIN restaurant r ON r.chr_id = chr.id
  INNER JOIN chr_keyword ck ON ck.chr_id = chr.id
  INNER JOIN client_keyword clk ON clk.keyword_id = ck.keyword_id
  WHERE clk.client_id = 1 -- ID du client à filtrer
) AS r

UNION ALL

SELECT 
  'hotel' AS category,
  JSON_ARRAYAGG(JSON_OBJECT('id', h.id, 'name', h.name)) AS items
FROM (
  SELECT DISTINCT h.id, chr.name
  FROM chr
  INNER JOIN hotel h ON h.chr_id = chr.id
  INNER JOIN chr_keyword ck ON ck.chr_id = chr.id
  INNER JOIN client_keyword clk ON clk.keyword_id = ck.keyword_id
  WHERE clk.client_id = 1 -- ID du client à filtrer
) AS h

UNION ALL

SELECT 
  'activity' AS category,
  JSON_ARRAYAGG(JSON_OBJECT('id', a.id, 'name', a.name)) AS items
FROM (
  SELECT DISTINCT a.id, chr.name
  FROM chr
  INNER JOIN activity a ON a.chr_id = chr.id
  INNER JOIN chr_keyword ck ON ck.chr_id = chr.id
  INNER JOIN client_keyword clk ON clk.keyword_id = ck.keyword_id
  WHERE clk.client_id = 1 -- ID du client à filtrer
) AS a;


-----------------------------------------

SELECT 
  sub.category,
  JSON_ARRAYAGG(JSON_OBJECT('id', sub.id, 'name', sub.name, 'common_keywords', sub.common_keywords)) AS items
FROM (
  SELECT 
    'restaurant' AS category,
    r.id,
    chr.name,
    COUNT(ck.keyword_id) AS common_keywords
  FROM chr
  INNER JOIN restaurant r ON r.chr_id = chr.id
  INNER JOIN chr_keyword ck ON ck.chr_id = chr.id
  INNER JOIN client_keyword clk ON clk.keyword_id = ck.keyword_id
  WHERE clk.client_id = 1 -- ID du client à filtrer
  GROUP BY r.id, chr.name

  UNION ALL

  SELECT 
    'hotel' AS category,
    h.id,
    chr.name,
    COUNT(ck.keyword_id) AS common_keywords
  FROM chr
  INNER JOIN hotel h ON h.chr_id = chr.id
  INNER JOIN chr_keyword ck ON ck.chr_id = chr.id
  INNER JOIN client_keyword clk ON clk.keyword_id = ck.keyword_id
  WHERE clk.client_id = 1 -- ID du client à filtrer
  GROUP BY h.id, chr.name

  UNION ALL

  SELECT 
    'activity' AS category,
    a.id,
    chr.name,
    COUNT(ck.keyword_id) AS common_keywords
  FROM chr
  INNER JOIN activity a ON a.chr_id = chr.id
  INNER JOIN chr_keyword ck ON ck.chr_id = chr.id
  INNER JOIN client_keyword clk ON clk.keyword_id = ck.keyword_id
  WHERE clk.client_id = 1 -- ID du client à filtrer
  GROUP BY a.id, chr.name
) AS sub
GROUP BY sub.category
ORDER BY (
  CASE 
    WHEN sub.category = 'restaurant' THEN 
      (SELECT MAX(temp.common_keywords)
       FROM (
         SELECT 
           COUNT(ck.keyword_id) AS common_keywords
         FROM chr
         INNER JOIN restaurant r ON r.chr_id = chr.id
         INNER JOIN chr_keyword ck ON ck.chr_id = chr.id
         INNER JOIN client_keyword clk ON clk.keyword_id = ck.keyword_id
         WHERE clk.client_id = 1
         GROUP BY r.id
       ) AS temp)
    WHEN sub.category = 'hotel' THEN 
      (SELECT MAX(temp.common_keywords)
       FROM (
         SELECT 
           COUNT(ck.keyword_id) AS common_keywords
         FROM chr
         INNER JOIN hotel h ON h.chr_id = chr.id
         INNER JOIN chr_keyword ck ON ck.chr_id = chr.id
         INNER JOIN client_keyword clk ON clk.keyword_id = ck.keyword_id
         WHERE clk.client_id = 1
         GROUP BY h.id
       ) AS temp)
    WHEN sub.category = 'activity' THEN 
      (SELECT MAX(temp.common_keywords)
       FROM (
         SELECT 
           COUNT(ck.keyword_id) AS common_keywords
         FROM chr
         INNER JOIN activity a ON a.chr_id = chr.id
         INNER JOIN chr_keyword ck ON ck.chr_id = chr.id
         INNER JOIN client_keyword clk ON clk.keyword_id = ck.keyword_id
         WHERE clk.client_id = 1
         GROUP BY a.id
       ) AS temp)
  END
) DESC;


