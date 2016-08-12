import React from 'react'
import prettyData from 'pretty-data'
import fileDownload from 'react-file-download'
import { buildReport } from '../helpers/ReportBuilder'
import { getEdges } from '../helpers/StuccoApi'
import { connect } from 'react-redux'
// import cx from 'classnames'

import Property from './Property'
import EdgeResult from './EdgeResult'
import SourceDocument from './SourceDocument'

class Details extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showStix: false,
      inEdges: [],
      outEdges: []
    }
    this.handleShowStix = this.handleShowStix.bind(this)
    this.getInEdgesCallback = this.getInEdgesCallback.bind(this)
    this.getOutEdgesCallback = this.getOutEdgesCallback.bind(this)
  }
  getInEdgesCallback (res) {
    this.setState({inEdges: res.send.results})
  }
  getOutEdgesCallback (res) {
    this.setState({outEdges: res.send.results})
  }
  componentWillMount () {
    var reqIn = {
      params: {
        id: this.props.vertex._id
      },
      query: {
        pageSize: 10,
        page: 0,
        inEdges: true,
        outEdges: false
      }
    }
    getEdges(reqIn, {}, this.getInEdgesCallback)
    var reqOut = {
      params: {
        id: this.props.vertex._id
      },
      query: {
        pageSize: 10,
        page: 0,
        inEdges: false,
        outEdges: true
      }
    }
    getEdges(reqOut, {}, this.getOutEdgesCallback)
  }
  componentWillUnmount () {
    if (window.localStorage.getItem('report') !== null) {
      window.localStorage.removeItem('report')
    }
  }
  handleShowStix () {
    this.setState({
      showStix: !this.state.showStix
    })
  }
  mapObject (object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key])
    })
  }
  render () {
    const prettySourceDocument = prettyData.pd.xml(this.props.vertex.sourceDocument)
    const vertexName = this.props.vertex.name
    const id = this.props.vertex._id
    const dispatch = this.props.dispatch
    const report = this.props.report
    function handleDownloadStix () {
      fileDownload(prettySourceDocument, vertexName + '.xml')
    }
    function handleAddToReport () {
      var action = {
        type: 'ADD_TO_REPORT',
        report: {
          xml: prettySourceDocument,
          id: id
        }
      }
      dispatch(action)
    }
    function handleClearReport () {
      var action = {
        type: 'CLEAR_REPORT'
      }
      dispatch(action)
    }
    function handleDownloadReport () {
      if (report !== null && report !== undefined && Object.keys(report).length !== 0) {
        var prettyReport = prettyData.pd.xml(buildReport(report))
        fileDownload(prettyReport, 'stix-report.xml')
      }
    }
    function handleShowReport () {
      var prettyReport = prettyData.pd.xml(buildReport(report))
      window.localStorage.setItem('report', prettyReport)
    }
    return (
      <div className='container-fluid'>
        <section className="page alert-details">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="pull-right">
                <button type="button" aria-label="Close" className="close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <h3 className="panel-title">
                <span >{this.props.vertex.vertexType}</span>
                <span>&nbsp; ⟶ &nbsp;</span>
                <span >{this.props.vertex._id}</span>
              </h3>
            </div>
            <div className="panel-body">
              <dl className="dl-horizontal">
                <dt>Name</dt>
                <dd >{this.props.vertex.name}</dd>
                <dt>Description</dt>
                <dd >{this.props.vertex.description}</dd>
                <span >
                  {
                    this.mapObject(this.props.vertex, function (key, value) {
                      if (key !== 'description' && key !== 'name' && key !== 'sourceDocument' && key !== '_id') {
                        if (value.constructor === Array) {
                          value = value.toString()
                        }
                        return <Property key={key} propertyName={key} propertyValue={value} />
                      }
                    })
                  }
                </span>
                <dt>Source Document</dt>
                <dd>
                  <table style={{textAlign: 'left', width: '450px', height: '70px'}}>
                    <tbody >
                      <tr>
                        <td>
                          <form>
                            <input type="checkbox" style={{marginRight: '5px'}} onClick={this.handleShowStix} />
                            Show STIX
                          </form>
                        </td>
                        <td>
                          <button className="btn btn-default" onClick={handleDownloadStix}>
                            <span aria-hidden="true" className="glyphicon glyphicon-download"></span>
                            Download STIX
                          </button>
                        </td>
                      </tr>
                    </tbody >
                  </table>
                  <div role="group" className="btn-group">
                    <button className="btn btn-default" onClick={handleAddToReport}>
                      <span aria-hidden="true" className="glyphicon glyphicon-plus"></span>
                      Add To Report
                    </button>
                    <a href='../stix-to-html/stix.html' target="_blank" className="btn btn-default" onClick={handleShowReport}>
                      <span aria-hidden="true" className="glyphicon glyphicon-book"></span>
                      Show Report
                    </a>
                    <button className="btn btn-default" onClick={handleClearReport}>
                      <span aria-hidden="true" className="glyphicon glyphicon-remove"></span>
                      Clear Report
                    </button>
                    <button className="btn btn-default" onClick={handleDownloadReport}>
                      <span aria-hidden="true" className="glyphicon glyphicon-download-alt"></span>
                      Download Report
                    </button>
                  </div>
                  <div>
                    {this.state.showStix ? <SourceDocument sourceDocument={prettySourceDocument} /> : null}
                  </div>
                </dd>
                <dt>&nbsp;</dt>
                <dd>&nbsp;</dd>
                <dt>Incoming Edges</dt>
                <dd>
                  <ul style={{paddingLeft: 0}} className="inEdgeList">
                  {this.state.inEdges.map((vertex, i) => <EdgeResult type={'inEdges'} key={i} vertex={vertex[0]} />)}
                  </ul>
                  <nav>
                    <ul className="pager">
                      <li className="previous disabled">
                        <a href="#">
                          <span aria-hidden="true">&larr;</span>
                          Previous
                        </a>
                      </li>
                      <li className="next">
                        <a href="#">Next <span aria-hidden="true">&rarr;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </dd>
                <dt>Outgoing Edges</dt>
                <dd>
                  <ul style={{paddingLeft: 0}} className="outEdgeList">
                  {this.state.outEdges.map((vertex, i) => <EdgeResult type={'outEdges'} key={i} vertex={vertex[2]} />)}
                  </ul>
                  <nav>
                    <ul className="pager">
                      <li className="previous disabled">
                        <a href="#"><span aria-hidden="true">&larr;</span> Previous</a>
                      </li>
                      <li className="next">
                        <a href="#">Next <span aria-hidden="true">&rarr;</span></a>
                      </li>
                    </ul>
                  </nav>
                </dd>
              </dl>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

Details.propTypes = {
  vertex: React.PropTypes.object,
  report: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

const mapStateToProps = function (store) {
  return {
    vertex: store.vertex.vertex,
    report: store.report
  }
}

export default connect(mapStateToProps)(Details)
