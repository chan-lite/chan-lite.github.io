import React, { PureComponent } from "react";
import Animated from "animated/lib/targets/react-dom";

export default class extends PureComponent {
  opacity = new Animated.Value(0);
  translateY = new Animated.Value(1);

  componentDidMount() {
    this.animate();
  }

  shouldComponentUpdate({ propToTriggerChange }) {
    return propToTriggerChange !== this.props.propToTriggerChange;
  }

  componentWillReceiveProps({ propToTriggerChange }) {
    if (propToTriggerChange !== this.props.propToTriggerChange) {
      this.reset();
    }
  }

  componentDidUpdate() {
    this.animate();
  }

  animate() {
    Animated.parallel([
      Animated.timing(this.opacity, {
        toValue: 1,
        duration: 250
      }),
      Animated.timing(this.translateY, {
        toValue: 0,
        duration: 250
      })
    ]).start();
  }

  reset() {
    Animated.parallel([
      Animated.timing(this.opacity, {
        toValue: 0,
        duration: 0
      }),
      Animated.timing(this.translateY, {
        toValue: 1,
        duration: 0
      })
    ]).start();
  }

  render() {
    return (
      <Animated.div
        className="transition-component"
        style={{
          opacity: this.opacity,
          transform: [
            {
              translateY: this.translateY.interpolate({
                inputRange: [0, 1],
                outputRange: ["0px", "10px"]
              })
            }
          ]
        }}
      >
        {this.props.children}
      </Animated.div>
    );
  }
}
