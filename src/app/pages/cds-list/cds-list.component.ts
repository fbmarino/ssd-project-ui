import {Component, OnInit} from '@angular/core';

interface Item {
  title: string;
  subtitle: string;
  description: string;
  img: string;
}

@Component({
  selector: 'cds-list',
  templateUrl: './cds-list.component.html',
  styleUrls: ['./cds-list.component.scss']
})
export class CdsListComponent implements OnInit {

  items: Item[] = [];

  ngOnInit(): void {
    this.items.push(<Item>{
      title: "The plot against America",
      subtitle: "Philip Roth",
      description: "When the renowned aviation hero and rabid isolationist Charles A. " +
        "Lindbergh defeated Franklin Roosevelt by a landslide in the 1940 presidential election, " +
        "fear invaded every Jewish household in America.",
      img: "https://images-na.ssl-images-amazon.com/images/P/0618509283.01._SX180_SCLZZZZZZZ_.jpg"
    });

    this.items.push(<Item>{
      title: "Underworld",
      subtitle: "Don DeLillo",
      description: "A 1950s teenage hood from New York is transformed by the Jesuits into a respectable man, " +
        "managing hazardous waste. A portrait of the decade from the viewpoint of the garbage industry.",
      img: "https://pics.cdn.librarything.com/picsizes/a7/c1/a7c197f68a3856f593036795441433041414141_v5.jpg"
    });

    this.items.push(<Item>{
      title: "I Married a Communist",
      subtitle: "Philip Roth",
      description: "During the McCarthy era, a wife revenges herself on her husband by denouncing him as a Communist. " +
        "It happens to Iron Rinn, a radio commentator, after he told her he did not want her daughter in the house.",
      img: "https://images-na.ssl-images-amazon.com/images/P/0375707212.01._SX180_SCLZZZZZZZ_.jpg"
    });

    this.items.push(<Item>{
      title: "The Story of Scotland's Flag and the Lion and Thistle",
      subtitle: "David Ross",
      description: "The story of the how Saint Andrew's Cross, or The Saltire, became Scotland's Flag. Part of the Corbies series of books. Ideal for explaining aspects of history to younger children. Recommended for age 7+.",
      img: "https://images-na.ssl-images-amazon.com/images/P/1902407059.01._SX180_SCLZZZZZZZ_.jpg"
    });

    this.items.push(<Item>{
      title: "The Awesome Egyptians (Horrible Histories) ",
      subtitle: "Terry Deary",
      description: "Revealing facts about the awesome ancients, their groovy gods, potty pyramids and their mad mummies, this book also tells how a hunted hippo got his own back on a pharaoh, and discovers the truth about the cool Queen Cleo and the curse of Tutankhamun.",
      img: "https://images-na.ssl-images-amazon.com/images/P/0590552899.01._SX180_SCLZZZZZZZ_.jpg"
    });
  }

}
