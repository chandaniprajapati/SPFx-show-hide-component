import * as React from 'react';
import styles from './SpfxShowHideComponent.module.scss';
import { ISpfxShowHideComponentProps } from './ISpfxShowHideComponentProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SpfxShowHideComponent extends React.Component<ISpfxShowHideComponentProps, {}> {
  public render(): React.ReactElement<ISpfxShowHideComponentProps> {
    return (
      <div className={styles.spfxShowHideComponent}>
        {this.props.textOrImageType == "Text" ? this.props.simpleText :
          (<img src={this.props.imageUrl} height="250px" width="250px" alt="No Image" />)
        }
      </div>
    );
  }
}
