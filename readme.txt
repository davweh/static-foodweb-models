Author: David Huber
Date: 28 June, 2019


ToDo:  -improve layout







english version below!
_________________________________________________________________________________________________________________________________________________________


Deutsch:


==========================================================
Einführung
==========================================================

Struktur von Nahrungsnetzen
Webpage zur Visualisierung von drei statischen Modellen aus der Nahrungsnetzforschung: 
Zufälliges Netzwerk, Kaskadenmodell, Nischenmodell.

Netzwerke können mit gewünschter Knoten- und Verknüfungsanzahl nach den drei oben genannten Modellen erzeugt werden. 
Zusätzlich sind drei Beispiele implementiert: Skipwith Pond, Bridge Brook Lake, Little Rock Lake. Anhand dieser können die drei Modelle getestet werden.
Neben der einfachen Rechnung, gibt es noch die Möglichkeit, dass gewünschte Netzwerk beliebig oft rechnen zu lassen. Zum besseren Vergleichen
 werden dann Mittelwert und Standardabweichung angezeigt.
Zur veranschaulichung der Modelle gibt es noch die Möglichkeit, die Knoten nach Nischenwert(siehe Modellbeschreibung) zu sortieren.
Durch anzeigen der Fress-Beziehung wird ersichtlich, wie die Modelle im groben funktionieren.
(Detailliertere Beschreibung der einzelnen Buttons und Inputfelder siehe unten)

D3.js Version 5 ist eine JavaScript-Bibliothek zur Daten-Visualisierung. Wird hier zur Graphendarstellung benutzt. 
              Insbesondere die Kraftsimulation, die für die Animation der Graphen sorgt.


==========================================================
Anforderungen
==========================================================

Zum Ausführen wird lediglich ein Browser gebraucht.

Getestet wurde mit Firefox 67.0.4 unter Ubuntu 18.04 und Windows 10.
Es wird empfohlen, Firefox zu benutzen, je nach Browser kann das Layout stark variieren.


==========================================================
Benutzung
==========================================================

Zum starten muss main.html mit einem Browser aufgerufen werden. 
In den drei Fenstern werden die Modelle angezeigt. 
Erklärungen:
Button, Inputfields:

    Spezies: Eingabe der gewünschten Knotenanzahl
    Links: Eingabe der gewünschten Verknüfungsanzahl
    Connec. error: Der zulässige Bereich, in dem sich die Connectance des Nischenmodells befinden darf
    Reload: Lädt mit eingegebener Knotenanzahl und Verknüpfungsanzahl die Graphen 
    Clear All: setzt alles zurück


    Clear Windows: Entfernt die Graphen aus den Fenstern
    Sort: Sortiert die Graphen in den Fenstern nach dem Nischenwert (bzw. bei dem zufälligen Netzwerk einfach nach id im Code)
            und nummeriert die ersten beiden mit dem kleinsten Nischenwert mit 1 und 2
    Unsort: Macht die Sortierung wieder rückgängig, die normale Graphanimation wird gestartet


    Skipwith Pond, Bridge Brook Lake, Little Rock Lake: Lädt die Modelle mit entsprechender Knoten- und Verknüpfungsanzahl
                                                        und öffnet die Tabelle mit den empirischen Daten.
    Clear Table: Entfernt die Tabelle mit den empirischen Daten wieder.

    Calc. multiple times: Eingabe gibt an, wie oft die Graphen in der gegebenen Konstellation berechnet 
                          (nicht dargestellt) werden. Berechnet anschließend Mittelwert und Standardabweichung.
                           In der Tabelle wird das Resultat in dem Format:  "Mittelwert"|"Standardabweichung" angezeigt.
    Start: startet die Berechnung nach Eingabe in "Calc. multiple times"

Checkboxes:

    Draw: Ist der Haken gesetzt, werden die Graphen dargstellt. 

    Focus: Ist der Haken gesetzt, kann mit der Maus über die Knoten gefahren werden. Es werden dann alle Knoten ausgegraut,
    außer die, die von besagtem Knoten "gefressen" werden.

    Connected: Stellt sicher, dass in den Netzwerken keine einzelnen unverbundenen Knoten auftauchen.
        


==========================================================
Informationen zum Code und zur Weiterbenutzung
==========================================================

Der Code darf gerne benutzt, angepasst und erweitert werden. 


main.html:   HTML-Seite halt

networks.js: JavaScript file, enthält alle Funktionen zur Berechnung und Darstellung der Graphen

d3.v5.min.js: D§.js Version 5, JavaScript-Bibliothek zur Daten-Visualisierung.

style.css:  CSS file, enthält style optionen für Buttons, Tabellen,...


style.css und networks.js sind nur in minifiziertier Version enthalten.
(unnötige Leerzeichen und ähnliches werden entfernt, Variablennamen werden verkürzt, etc.)

Das verbessert in der Regel die Laufzeit/Dynamik einer Seite, aber erschwert die Lesbarkeit des Codes.
Entsprechend ist es schwer, den Code in dieser Form zu bearbeiten.
In dem Fall, dass jemand den Code in voller Länge haben möchte oder wenn es Fragen zum Code gibt, einfach bei mir melden.

David 












_________________________________________________________________________________________________________________________________________________________


English:

==========================================================
Introduction
==========================================================

Structure of food webs
Webpage to visualize three static models from food web research: 
random network, cascade model, niche model.

Food webs can be generated with arbitrary node and link number using the three models mentioned above.
In addition, three examples are implemented: Skipwith Pond, Bridge Brook Lake, Little Rock Lake. With these the three models can be tested.
Beside the "one-time" calculation,  another possibility is, to calculate the graphs multiple times. For better comparison the tables show 
mean value and standard deviation.
To show how the models work, it is possible to sort the nodes by niche value (see Model description). Displaying the feeding interactions shows how the models work.
(For more detailed description of buttons and inputfields see below)


 D3.js version 5 is a JavaScript library for data visualization. It is used here to show the graph, especially for the force simulation that animates the Graphs.

==========================================================
Requirements
==========================================================

To run this page only a browser is needed.

Tests done with Firefox 67.0.4 in Ubuntu 18.04 and Windows 10.
It is recommended to use firefox, since the layout can vary for different browsers. 


==========================================================
Usage
==========================================================

To start it, just run main.html in a browser.
The three windows show the models.
Explanations:
Button, Inputfields:

    Spezies: Input of wanted node number
    Links: Input of wanted link number
    Connec. error: Allowed interval for the connectance in the niche model
    Reload: Loads with entered node and link number the graphs 
    Clear All: resets everything


    Clear Windows: clears windows
    Sort: sorts the graphs by nishe value (in the random network by id in code) and numbers the first two nodes with the smallest nishe value by  1 and 2.
    Unsort: reversess the sorting


    Skipwith Pond, Bridge Brook Lake, Little Rock Lake: loads the models with the corresponding node and link number and opens the table with empirical data.
    Clear Table: deletes the table with empirical data

    Calc. multiple times: input declares, how often the graphs should be calculated (not shown) with the corresponding constellation.
                          Afterwards mean value and standard deviation are calculated and shown in the tables in the following form:
                          "mean value"|"standard deviation"
    Start: starts calculation after entering the number in "Calc. multiple times"

Checkboxes:

    Draw: If box is checked, the graphs are shown

    Focus: If box is checked, moving the mouse over a node results in all nodes becoming grey except the ones that are consumed by said node.

    Connected: Makes sure, that now single unconnected nodes appear        


==========================================================
Information on code and further usage
==========================================================

The code may be used, adjusted and extended.

main.html:  Well, the html document.

networks.js: JavaScript file, contains all functions to calculate and show the graphs

d3.v5.min.js: D3.js version 5, JavaScript library for data visualization.

style.css:  CSS file, contains style options for buttons, tables,...


style.css and networks.js are only included as minified versions
(unnecessary spaces and simliar stuff is removed, variable names are shorted, etc.)

In general this improves the runtime/dynamics of a page, but impedes the legibility of the code.
This makes it harder to work on the code in this form.
In the case that someone wants to have the code in full length or has questions regarding the code, just write me.

David



