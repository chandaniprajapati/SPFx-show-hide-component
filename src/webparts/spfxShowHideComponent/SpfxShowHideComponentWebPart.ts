import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpfxShowHideComponentWebPartStrings';
import SpfxShowHideComponent from './components/SpfxShowHideComponent';
import { ISpfxShowHideComponentProps } from './components/ISpfxShowHideComponentProps';

export interface ISpfxShowHideComponentWebPartProps {
  description: string;
  textOrImageType: string;
  simpleText: string;
  imageUrl: string;
}

export default class SpfxShowHideComponentWebPart extends BaseClientSideWebPart<ISpfxShowHideComponentWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpfxShowHideComponentProps> = React.createElement(
      SpfxShowHideComponent,
      {
        description: this.properties.description,
        textOrImageType: this.properties.textOrImageType,
        simpleText: this.properties.simpleText,
        imageUrl: this.properties.imageUrl,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    let textControl: any = [];
    let imageSourceControl: any = [];

    if (this.properties.textOrImageType === "Text") {
      textControl = PropertyPaneTextField('simpleText', {
        label: "Text",
        placeholder: "Enter Text"
      });
    }
    else {
      imageSourceControl = PropertyPaneTextField('imageUrl', {
        label: "Image URL",
        placeholder: "Enter Image URL"
      });
    }

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneChoiceGroup('textOrImageType', {
                  label: 'Image/Text',
                  options: [{
                    key: 'Text',
                    text: 'Text',
                    checked: true
                  },
                  {
                    key: 'Image',
                    text: 'Image',
                  }
                  ]
                }),
                textControl,
                imageSourceControl
              ]
            }
          ]
        }
      ]
    };
  }
}