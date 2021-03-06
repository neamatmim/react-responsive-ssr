// see also components/ScreenSize for another way to consume this data
import * as React from 'react';
import MediaQuery, { MediaQueryMatchers, MediaQueryProps } from 'react-responsive';
import { Responsive } from './Responsive';
import { withResponsive } from './withResponsive';

interface IMediaQuerySSRProps extends MediaQueryProps {
  responsive?: Responsive;
}

interface IMediaQuerySSRState {
  isMounted: boolean;
}

class MediaQueryComponent extends React.Component<IMediaQuerySSRProps, IMediaQuerySSRState> {
  public state: IMediaQuerySSRState;

  constructor(props) {
    super(props);

    this.state = {
      isMounted: false,
    };
  }

  public componentDidMount() {
    this.setState(() => ({
      isMounted: true,
    }));
  }

  public render() {
    const {
      responsive,
      ...rest
    } = this.props;

    const {
      isMounted,
    } = this.state;

    const values: Partial<MediaQueryMatchers> | undefined = !isMounted ? {
      deviceWidth: responsive && responsive.fakeWidth,
      width: responsive && responsive.fakeWidth,
    } : undefined;

    return (
      <MediaQuery
        values={values}
        {...rest}
      />
    );
  }
}

export const MediaQuerySSR = withResponsive(MediaQueryComponent);
