import React from 'react'

class Details extends React.Component {
  render () {
    return (
      <div>
        <section className="page alert-details">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="pull-right">
                <button type="button" aria-label="Close" className="close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <h3 className="panel-title">
                <span ></span>
                <span>&nbsp; &#10230; &nbsp;</span>
                <span ></span>
              </h3>
            </div>
            <div className="panel-body">
              <dl className="dl-horizontal">
                <dt>Name</dt>
                <dd ></dd>
                <dt>Description</dt>
                <dd ></dd>
                <span ></span>
                <dt>Source Document</dt>
                <dd>
                  <table style={{textAlign: 'left', width: '450px', height: '70px'}}>
                    <tbody >
                      <tr>
                        <td>
                          <form>
                            <input type="checkbox" style={{marginRight: '5px'}} />
                            Show STIX
                          </form>
                        </td>
                        <td>
                          <button className="btn btn-default">
                            <span aria-hidden="true" className="glyphicon glyphicon-download"></span>
                            Download STIX
                          </button>
                        </td>
                      </tr>
                    </tbody >
                  </table>
                  <div role="group" className="btn-group">
                    <button className="btn btn-default">
                      <span aria-hidden="true" className="glyphicon glyphicon-plus"></span>
                      Add To Report
                    </button>
                    <button className="btn btn-default">
                      <span aria-hidden="true" className="glyphicon glyphicon-book"></span>
                      Show Report
                    </button>
                    <button className="btn btn-default">
                      <span aria-hidden="true" className="glyphicon glyphicon-remove"></span>
                      Clear Report
                    </button>
                    <button className="btn btn-default">
                      <span aria-hidden="true" className="glyphicon glyphicon-download-alt"></span>
                      Download Report
                    </button>
                  </div>
                  <div className="xml">
                    <pre></pre>
                  </div>
                </dd>
                <dt>&nbsp;</dt>
                <dd>&nbsp;</dd>
                <dt>Incoming Edges</dt>
                <dd>
                  <ul style={{paddingLeft: 0}} className="inEdgeList"></ul>
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
                  <ul style={{paddingLeft: 0}} className="outEdgeList"></ul>
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
  vertex: React.PropTypes.object
}

export default Details
