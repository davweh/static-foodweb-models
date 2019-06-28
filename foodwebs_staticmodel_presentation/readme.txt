Author: David Huber
Datum: 28.Juni, 2019

==========================================================
Einführung
==========================================================

Struktur von Nahrungsnetzen
Webpage zur Visualisierung von drei statischen Modellen aus der Nahrungsnetzforschung: 
Zufälliges Netzwerk, Kaskadenmodell, Nischenmodell.

Netzwerke können mit gewünschter Knoten- und Verknüfungsanzahl nach den drei oben genannten Modellen erzeugt werden. 
Zusätzlich sind drei Beispiele implementiert: Skipwith Pond, Bridge Brool Lake, Little Rock Lake. Anhand dieser können die drei Modelle getestet werden.
Neben der einfachen Rechnung, gibt es noch die Möglichkeit, dass gewünschte Netzwerk beliebig oft rechnen zu lassen. Zum besseren Vergleichen
 werden dann Mittelwert und Standardabweichung angezeigt.
Zur veranschaulichung der Modelle gibt es noch die Möglichkeit, die Knoten nach Nischenwert(siehe Modellbeschreibung) zu sortieren.
Durch anzeigen der Fress-Beziehung wird ersichtlich, wie die Modelle im groben funktionieren.
(Detailliertere Beschreibung der einzelnen Buttons und Inputfelder siehe unten)


==========================================================
Anforderungen
==========================================================

Zum Ausführen wird lediglich ein Browser gebraucht. Auch eine Internetverbindung ist nicht notwendig.

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

d3.v5.min.js: D3.js Version 5, JavaScript-Bibliothek zur Daten-Visualisierung. Wird hier zur Graphendarstellung benutzt. 
              Insbesondere die Kraftsimulation, die für die Animation der Graphen sorgt.

style.css:  CSS file, enthält style optionen für Buttons, Tabellen,...



style.css und networks.js sind nur in minifiziertier Version enthalten.
(unnötige Leerzeichen und ähnliches werden entfernt, Variablennamen werden verkürzt, etc.)

Das verbessert in der Regel die Laufzeit/Dynamik einer Seite, aber erschwert die Lesbarkeit des Codes.
Entsprechend ist es schwer, den Code in dieser Form zu bearbeiten.
In dem Fall, dass jemand den Code in voller Länge haben möchte oder wenn es Fragen zum Code gibt, einfach bei mir melden.

David 

