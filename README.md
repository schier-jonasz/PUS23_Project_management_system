# PUS23_Project_management_system

Prosta aplikacja do zarządzania projektami dla małych firm. Jej zadaniem jest umożliwienie małym firmom zarządzanie projektami i zadaniami w sposób bardziej efektywny i zorganizowany.

Aplikacja będzie składać się z dwóch usług. Pierwsza z nich to główna usługa udostępniająca REST API oraz WS to komunikacji z klientem. Druga z nich to usługa do przechowywania informacji na temat zdarzeń, które wystąpiły w systemie.

##Funkcjonalność
- Zarządzanie projektami | Możliwość tworzenia i zarządzania projektami, przypisywanie zadań dla
każdego projektu, określanie ich priorytetów i terminów wykonania.
- Śledzenie postępów | Mozliwość śledzenia postępów projektów i zadań w czasie rzeczywistym, aby mieć lepszą kontrolę nad ich postępem.
- Komunikacja z zespołem | Aplikacja powinna umożliwiać komunikację między członkami zespołu
projektowego, np. za pomocą wewnętrznej wiadomości lub komentarzy pod zadaniem.
- Harmonogramowanie zadań | Firma ma możliwość planowania harmonogramów projektów i zadań, aby uniknąć opóźnień i nieprzewidzianych problemów.
- Analiza efektywności | Aplikacja umożliwia firmie analizowanie efektywności zespołu  projektowego, np. poprzez wykresy, raporty i statystyki dotyczące wykonanych zadań i czasu ich trwania.


##Technologie
- PostgreSQL | Przechowywanie danych związanych z projektami oraz zadaniami, takich
jak informacje o projektach, zadaniach, członkach zaspołu i harmonogramie.
- MongoDB | Baza do przechowywania danych na temat zdarzeń, które wystąpiły w systemie.
- Redis | Baza do przechowywania tymczasowych danych. W projekcie będzie służyć jako warstwa cachująca, która pozwala na ograniczenia ilości zapytań do bazy danych.
- RabbitMQ | Zapewni asynchroniczną komunikację w systemie. Pozwoli na emisję zdarzeń przez API, a następnie konsumowanie ich przez drugą usługę.
