import { Component } from "react"

/**
 * @type {typeof Component<{
 *  title?: string
 * }>}
 */
const TypedComponent = Component

export class JsComponent extends TypedComponent {
  render() {
    this.props.title
    return <div></div>
  }
}
