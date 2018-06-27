import cx from 'classnames';
import * as React from 'react';
import { Button } from 'reactstrap';

export class CustomButton extends React.Component<any, any> {
  public render() {
    const {
      simple,
      round,
      icon,
      neutral,
      iconMini,
      leftLabel,
      rightLabel,
      wd,
      className,
      twitter,
      facebook,
      google,
      linkedin,
      pinterest,
      youtube,
      tumblr,
      github,
      behance,
      dribbble,
      reddit,
      stumbleupon,
      ...rest
    } = this.props;

    let btnClasses = cx({
      'btn-simple': simple,
      'btn-round': round,
      'btn-icon': icon,
      'btn-neutral': neutral,
      'btn-icon btn-icon-mini': iconMini,
      'btn-wd': wd,
      'btn-twitter': twitter,
      'btn-facebook': facebook,
      'btn-google': google,
      'btn-linkedin': linkedin,
      'btn-pinterest': pinterest,
      'btn-youtube': youtube,
      'btn-tumblr': tumblr,
      'btn-github': github,
      'btn-behance': behance,
      'btn-dribbble': dribbble,
      'btn-reddit': reddit,
      'btn-stumbleupon': stumbleupon,
    });

    if (className !== undefined) {
      btnClasses += ' ' + className;
    }

    return (
      <Button className={btnClasses} {...rest}>
        {leftLabel ? (
          <span className="btn-label">
            <i className={leftLabel} />{' '}
          </span>
        ) : null}
        {this.props.children}
        {rightLabel ? (
          <span className="btn-label btn-label-right">
            <i className={rightLabel} />{' '}
          </span>
        ) : null}
      </Button>
    );
  }
}
